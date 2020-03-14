<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapsUserSettings extends Model
{
    protected $fillable = [
        'home_id',
        'fav_id',
        'method',
        'user_id',
    ];
}
