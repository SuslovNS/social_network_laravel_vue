<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageMessage\StoreRequest;
use App\Http\Resources\ImageMessage\ImageMessageResource;
use App\Models\ImageMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageMessageController extends Controller
{
    public function store(StoreRequest $request)
    {
        $path = Storage::disk('public')->put('/images', $request['image']);
        $image = ImageMessage::create([
            'path' => $path,
            'user_id' => auth()->id()
        ]);
        return new ImageMessageResource($image);
    }
}
