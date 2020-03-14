<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Notes;

class NotesController extends Controller {
    public function fetchNotes() {
        if ($user = session('user'))
            return Notes::where('author_id', $user['id'])->get();
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
        Notes::find($note['id'])->delete();
    }
}
