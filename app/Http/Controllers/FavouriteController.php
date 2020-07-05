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
        $toSave = Favourite::find($favourite['id']);
        $toSave->update($favourite);
        // return Favourite::find($favourite['id']);
        return [$toSave, Favourite::find($favourite['id']), $favourite];
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

    public function upload(Request $request) {
        $favourite = Favourite::find($request['object']['id']);

        if ($favourite) {
            // Delete existing image srcs before overwriting it
            if ($favourite['src'])
                $this->DeleteFile('images/favouritesIcons/'.$favourite['src']);

            $this->UploadFile('images/favouritesIcons/', $request['file']);
            $favourite->src = $request['file']['name'];
            $favourite->save();
        }
    }

    public function delete(Request $request) {
        return $this->DeleteFile('images/favouritesIcons/'.$request['name']);
    }
}
