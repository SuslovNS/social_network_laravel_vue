<?php

namespace App\Http\Resources\Message;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $url = isset($this->image) ? $this->image->url : null;
        return [
            'body' => $this->body,
            'sent_id' => $this->sent_user_id,
            'get_id' => $this->get_user_id,
            'image_url' => $url,
            'time' => $this->created_at->diffForHumans(),
        ];
    }
}
