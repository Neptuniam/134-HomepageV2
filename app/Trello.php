<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trello extends Model {
    public $fillable = [
        'user_id',
        'board_id',
        'developer_key',
        'token'
    ];
}
