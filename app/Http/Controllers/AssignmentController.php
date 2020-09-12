<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Assignment;

class AssignmentController extends Controller {
    public function fetchAssignments($course_id) {
        return Assignment::where('course_id', $course_id)->get();
    }

    public function createAssignment(Request $request) {
        $course = $request->all();
        return Assignment::create($course);
    }

    public function updateAssignment(Request $request) {
        $course = $request->all();
        Assignment::find($course['id'])->update($course);

        return Assignment::find($course['id']);
    }

    public function deleteAssignment($assignment_id) {
        Assignment::find($assignment_id)->delete();
    }

    public function fetchSortedAssignments($user_id) {
        return Assignment::get()->sortBy('assignment_dueDate');
    }
}
