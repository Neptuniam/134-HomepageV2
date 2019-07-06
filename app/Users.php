<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $fillable = [
        'user_id', 'name', 'pass'
    ];

    protected $hidden = [
        'created_at','deleted_at'
    ];
}
