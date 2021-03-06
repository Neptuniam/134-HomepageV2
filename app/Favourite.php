<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favourite extends Model {
    public $fillable = [
            'user_id',
            'title',
            'url',
            'src',
            'pos'
        ];
    const CREATED_AT = null;
}
