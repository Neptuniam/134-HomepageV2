<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Analytics extends Model {
    public $table = "api_events";

    public $fillable = [
        'user_id',
        'api',
        'hit_source'
    ];
}
