<?php

namespace App\Http\Controllers;

use App\Events\StoreMessageEvent;
use App\Http\Resources\Message\MessageResource;
use App\Models\ImageMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index($id)
    {
        $userId = auth()->id();
        $getUserId = (int)$id;

        $messages = Message::where
        ([
            ['sent_user_id', $userId],
            ['get_user_id', $getUserId]
        ])->orWhere([
            ['sent_user_id', $getUserId],
            ['get_user_id', $userId]
        ])->orderBy('created_at', 'asc')->get();
        return MessageResource::collection($messages);
    }

    public function sendMessage(Request $request, $userId)
    {
        $inputMessage = $request->input('message');
        $sendUserId = $request->input('sendUserId');
        $imageId = $request->input('image_id');
        $message = Message::create([
            'body' => $inputMessage,
            'sent_user_id' => $sendUserId,
            'get_user_id' => $userId,
        ]);
        $this->processImage($message, $imageId);
        ImageMessage::clearStorage();
        $channelId = $userId < $sendUserId ? "{$userId}-{$sendUserId}" : "{$sendUserId}-{$userId}";
        broadcast(new StoreMessageEvent($message, $channelId))->toOthers();

        return new MessageResource($message);
    }

    private function processImage($message, $imageId)
    {
        if ($imageId) {
            $image = ImageMessage::find($imageId);
            $image->update([
                'message_id' => $message->id
            ]);
        }
    }
}
