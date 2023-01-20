<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StatRequest;
use App\Http\Resources\Post\PostResource;
use App\Http\Resources\User\UserResource;
use App\Models\LikedPosts;
use App\Models\Post;
use App\Models\SubscriberFollowing;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::whereNot('id', auth()->id())->get();
        $followingIds = SubscriberFollowing::where('subscriber_id', auth()->id())
            ->get('following_id')->pluck('following_id')->toArray();
        foreach ($users as $user){
            if (in_array($user->id, $followingIds)){
                $user->is_followed = true;
            }
        }

        return UserResource::collection($users);
    }

    public function post(User $user)
    {
        $posts = $user->posts()->latest()->withCount('repostedByPost')->get();
        $posts = $this->prepareLikedPosts($posts);
        return PostResource::collection($posts);
    }

    public function stat(StatRequest $request)
    {
        $data = $request->validated();
        $userId = isset($data['user_id']) ? $data['user_id'] : auth()->id();
        $result = [];
        $result['subscribers_count'] = SubscriberFollowing::where('following_id', $userId)->count();
        $result['followings_count'] = SubscriberFollowing::where('subscriber_id', $userId)->count();
        $postIds = Post::where('user_id', $userId)->get('id')->pluck('id')->toArray();
        $result['likes_count'] = LikedPosts::whereIn('post_id', $postIds)->count();
        $result['posts_count'] = count($postIds);

        return response()->json(['data' => $result]);
    }

    public function oneUserName($id)
    {
       $user = User::where('id', $id)->first();
       return $user->name;
    }

    public function toggleFollowing(User $user)
    {
        $res = auth()->user()->followings()->toggle($user->id);
        $data['is_followed'] = count($res['attached']) > 0;
        return $data;
    }

    public function followingPost()
    {
        $followedIds = auth()->user()->followings()->get()->pluck('id')->toArray();
        $posts = Post::whereIn('user_id', $followedIds)->with('user')->withCount('repostedByPost')->latest()->get();
        $posts = $this->prepareLikedPosts($posts);
        return PostResource::collection($posts);
    }

    private function prepareLikedPosts($posts)
    {
        $likedPostIds = LikedPosts::where('user_id', auth()->id())
            ->get('post_id')->pluck('post_id')->toArray();
        foreach ($posts as $post) {
            if (in_array($post->id, $likedPostIds)) {
                $post->is_liked = true;
            }
        }
        return $posts;
    }


}
