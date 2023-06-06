<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGuest()
    {
        $response = $this->assertGuest();
        $response->get('/api/users')->assertStatus(302);
    }

    public function testAuthUserActions()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $this->actingAs($user)->get('/api/users')->assertOk();
        $this->actingAs($user)->get('/api/users/'.$user->id.'/posts')->assertOk();
        $this->actingAs($user)->get('/api/users/'.$user2->id.'/toggle_following')->assertOk();
        $this->actingAs($user)->get('/api/users/following_posts')->assertOk();
        $this->actingAs($user)->get('/api/users/stats')->assertOk();
        $this->actingAs($user)->get('/api/users/get/'.$user2->id)->assertOk()->assertJsonPath('data.name', $user2->name);

        $user2->delete();
        $user->delete();
    }

    public function testPostsActions()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $post = [
            'title' => 'blabla',
            'content' => 'blablablblblb',
            'image_id' => null
        ];


        $this->actingAs($user)->get('/api/posts')->assertOk()->assertJsonPath('data', []);
        $this->actingAs($user)
            ->postJson('/api/posts',$post)
            ->assertStatus(201);
        $user2->delete();
        $user->delete();

    }
}
