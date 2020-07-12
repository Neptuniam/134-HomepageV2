<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $table = "news_categorys";

    public $fillable = [
        'user_id',
        'title',
        'pos'
    ];
}
