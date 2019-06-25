<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class Settings extends Controller {
    public function fetchWidgets() {
        return DB::table('widgets')->get();
    }

    public function updateWidget(Request $request) {
        $widget = $request->all();
        return DB::table('widgets')->where('id', $widget['id'])->update($widget);
    }



    public function fetchLocations() {
        return DB::table('locations')->get();
    }

    public function createLocation(Request $request) {
        $location = $request->all();
        return DB::table('locations')->insertGetId($location);

        // return DB::table('locations')->insertGetId([
        //     'title'     => $location['title'],
        //     'address'   => $location['address'],
        //     'lat'       => $location['lat'],
        //     'lng'       => $location['lng'],
        //     'favourite' => null
        //  ]
        // );
    }

    public function updateLocation(Request $request) {
        $location = $request->all();
        return DB::table('locations')->where('id', $location['id'])->update($location);
    }

    public function deleteLocation(Request $request) {
        $location = $request->all();
        DB::table('locations')->where('id', '=', $location['id'])->delete();
    }



    // Favourites
    public function fetchFavourites() {
        return DB::table('favourites')->get();
    }

    public function createFavourite(Request $request) {
        $favourite = $request->all();
        return DB::table('favourites')->insertGetId($favourite);
    }

    public function updateFavourite(Request $request) {
        $favourite = $request->all();
        return DB::table('favourites')->where('id', $favourite['id'])->update($favourite);
    }

    public function deleteFavourite(Request $request) {
        $favourites = $request->all();
        DB::table('favourites')->where('id', '=', $favourites['id'])->delete();
    }
}
?>
