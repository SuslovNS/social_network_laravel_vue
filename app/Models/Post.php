<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = false;
    protected $withCount = ['comments'];
    protected $with = ['image', 'likedUsers', 'repostedPost'];

    public function image()
    {
        return $this->hasOne(PostImage::class, 'post_id', 'id')
            ->whereNotNull('post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likedUsers()
    {
        return $this->belongsToMany(User::class, 'liked_posts', 'post_id', 'user_id');
    }

    public function repostedPost()
    {
        return $this->belongsTo(Post::class, 'reposted_id', 'id');
    }

    public function repostedByPost()
    {
        return $this->hasMany(Post::class, 'reposted_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }

}
