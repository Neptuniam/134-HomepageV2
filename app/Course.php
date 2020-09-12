<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Assignment;

class Course extends Model {
    public $table = 'max_courses';

    public $fillable = [
        "user_id",
        "course_name",
        "prof_name",
        "colour"
    ];

    protected $appends = ['assignments'];

    public function getAssignmentsAttribute(){
        return Assignment::where('course_id', $this->id)->get();
    }
}
