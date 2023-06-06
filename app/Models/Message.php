<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $guarded = false;
    protected $with = ['image'];

    public function image()
    {
        return $this->hasOne(ImageMessage::class, 'message_id', 'id')
            ->whereNotNull('message_id');
    }

}
