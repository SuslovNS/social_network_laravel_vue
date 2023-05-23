<?php

namespace App\Events;

use App\Http\Resources\Message\MessageResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StoreMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $message;
    private $channelId;

    public function __construct(Message $message, $channelId)
    {
        $this->message = $message;
        $this->channelId = $channelId;
    }

    public function broadcastOn()
    {
        return new Channel('chat.' . $this->channelId);
    }

    public function broadcastAs()
    {
        return 'store_message';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith()
    {
        return [
            'message' => MessageResource::make($this->message)->resolve()
        ];
    }
}
