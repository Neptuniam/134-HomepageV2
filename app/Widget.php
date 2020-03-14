<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model {
    protected $fillable = [
        'user_id',
        'title',
        'status',
        'interval'
    ];
}
