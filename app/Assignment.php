<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model {
    public $table = 'max_assignments';

    public $fillable = [
        'course_id',
        'assignment_name',
        'assignment_dueDate',
        'assignment_status',
        'priority',
        'notes'
    ];
}
