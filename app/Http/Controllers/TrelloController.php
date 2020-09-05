<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Trello;

class TrelloController extends Controller {
    public function fetchTrellos($userID) {
        return Trello::where('user_id', $userID)->get();
    }

    public function createTrello(Request $request) {
        $category = $request->all();
        return Trello::create($category);
    }

    public function updateTrello(Request $request) {
        $category = $request->all();
        Trello::find($category['id'])->update($category);

        return Trello::find($category['id']);
    }

    public function deleteTrello(Request $request) {
        $category = $request->all();
        Trello::find($category['id'])->delete();
    }

}
