<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Favourite;

class FavouriteController extends Controller {
    public function fetchFavourites() {
        if ($user = session('user'))
            return Favourite::where('user_id', $user['id'])->orderBy('pos')->get();
    }

    public function createFavourite(Request $request) {
        $favourite = $request->all();
        return Favourite::create($favourite);
    }

    public function updateFavourite(Request $request) {
        $favourite = $request->all();
        return Favourite::find($favourite['id'])->update($favourite);
    }

    public function deleteFavourite(Request $request) {
        $favourites = $request->all();
        Favourite::find($favourites['id'])->delete();
    }

    public function updatePositions(Request $request) {
        $favourites = $request->all();
        $pos = 0;

        foreach ($favourites as $favourite) {
            $favourite['pos'] = $pos++;
            Favourite::find($favourite['id'])->update($favourite);
        }
    }
}
