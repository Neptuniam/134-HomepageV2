<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    protected $fillable = [
        'body', 'author_id'
    ];

    protected $hidden = [
        'created_at','updated_at'
    ];
}
