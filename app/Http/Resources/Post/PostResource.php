<?php

namespace App\Http\Resources\Post;

use App\Http\Requests\Post\RepostRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'image_url' => $url,
            'date' =>$this->created_at->diffForHumans(),
            'user' => $this->user ?? null,
            'is_liked' => $this->is_liked ?? false,
            'likes_count' => $this->likedUsers->count(),
            'reposted_post' => new RepostedPostResource($this->repostedPost),
            'comments_count' => $this->comments_count,
            'reposted_by_posts_count' => $this->reposted_by_post_count
        ];
    }
}
