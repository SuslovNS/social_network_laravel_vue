<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware'=>'auth:sanctum'], function (){
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::get('/users/{user}/posts', [\App\Http\Controllers\UserController::class, 'post']);
    Route::post('/users/{user}/toggle_following', [\App\Http\Controllers\UserController::class, 'toggleFollowing']);
    Route::get('/users/following_posts', [\App\Http\Controllers\UserController::class, 'followingPost']);
    Route::post('/users/stats', [\App\Http\Controllers\UserController::class, 'stat']);
    Route::get('/users/get/{user}', [\App\Http\Controllers\UserController::class, 'getUser']);


    Route::get('/posts', [\App\Http\Controllers\PostController::class, 'index']);
    Route::post('/posts', [\App\Http\Controllers\PostController::class, 'store']);
    Route::post('/post_images', [\App\Http\Controllers\PostImageController::class, 'store']);
    Route::post('/posts/{post}/toggle_like', [\App\Http\Controllers\PostController::class, 'toggleLike']);
    Route::post('/posts/{post}/repost', [\App\Http\Controllers\PostController::class, 'repost']);
    Route::post('/posts/{post}/comment', [\App\Http\Controllers\PostController::class, 'comment']);
    Route::get('/posts/{post}/comment', [\App\Http\Controllers\PostController::class, 'commentList']);
    Route::delete('/posts/{post}/delete', [\App\Http\Controllers\PostController::class, 'deletePost']);


    Route::post('/chat/{userId}/send', [\App\Http\Controllers\ChatController::class,'sendMessage']);
    Route::get('/chat/{userId}', [\App\Http\Controllers\ChatController::class,'index']);
    Route::post('/images_message', [\App\Http\Controllers\ImageMessageController::class, 'store']);
});
