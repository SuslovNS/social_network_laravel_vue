<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostImage extends Model
{
    protected $guarded = false;


    public function getUrlAttribute()
    {
        return url('storage/' . $this->path);
    }


}
