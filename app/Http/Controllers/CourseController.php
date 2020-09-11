<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Course;

class CourseController extends Controller {
    public function fetchCourses($userID) {
        return Course::where('user_id', $userID)->get();
    }

    public function createCourse(Request $request) {
        $course = $request->all();
        return Course::create($course);
    }

    public function updateCourse(Request $request) {
        $course = $request->all();
        Course::find($course['id'])->update($course);

        return Course::find($course['id']);
    }

    public function deleteCourse($id) {
        Course::find($course[$id])->delete();
    }
}
