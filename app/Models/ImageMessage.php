<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ImageMessage extends Model
{
    protected $guarded = false;


    public function getUrlAttribute()
    {
        return url('storage/' . $this->path);
    }


    public static function clearStorage(){
        $images = ImageMessage::where('user_id', auth()->id())
            ->whereNull('message_id')->get();

        foreach ($images as $image){
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }
    }
}
