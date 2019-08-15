<?php

namespace App\Http\Controllers;

use App\Notes;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NotesController extends Controller {
    // Saved Notes
    public function fetchNotes() {
        if ($user = session('user'))
            return DB::table('notes')->where('author_id', $user['id'])->get();
    }

    public function createNote(Request $request) {
        $note = $request->all();
        $user = session('user');

        $note['author_id'] = $user['id'];

        return Notes::create($note);
    }

    public function updateNote(Request $request) {
        $note = $request->all();
        $user = session('user');

        $note['author_id'] = $user['id'];

        return Notes::updateOrCreate(['id' => $note['id']], $note);
    }

    public function deleteNote(Request $request) {
        $note = $request->all();
        DB::table('notes')->where('id', '=', $note['id'])->delete();
    }


}
