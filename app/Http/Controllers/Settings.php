<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class Settings extends Controller {
    // Users
    public function createUser(Request $request) {
        $newUser = $request->all();

        // Create a row for them in the users table
        $user = DB::table('users')->insertGetId($newUser);

        // Create widgets setting for the user
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Weather', '1']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Maps', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Favourites', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Calendar', '0']);


        // Create their maps preferences row
        DB::insert('insert into maps_user_settings (user_id) values (?)', [$user]);

        return $user;
    }
    public function setUser(Request $request) {
        $user = $request->all();
        session(['user' => $user]);
    }

    public function fetchUsers() {
        return DB::table('users')->get();
    }


    // Widgets
    public function fetchWidgets() {
        if ($user = session('user'))
            return DB::table('widgets')->where('user_id', $user['id'])->get();
    }

    public function updateWidget(Request $request) {
        $widget = $request->all();
        return DB::table('widgets')->where('id', $widget['id'])->update($widget);
    }


    // Saved Locations
    public function fetchLocations() {
        if ($user = session('user'))
            return DB::table('locations')->where('user_id', $user['id'])->get();
    }

    public function createLocation(Request $request) {
        $location = $request->all();
        return DB::table('locations')->insertGetId($location);
    }

    public function updateLocation(Request $request) {
        $location = $request->all();
        return DB::table('locations')->where('id', $location['id'])->update($location);
    }

    public function deleteLocation(Request $request) {
        $location = $request->all();
        DB::table('locations')->where('id', '=', $location['id'])->delete();
    }

    // User Maps Settings
    public function fetchMapSettings() {
        if ($user = session('user'))
            return DB::table('maps_user_settings')->where('user_id', $user['id'])->get();
    }

    public function updateMapSettings(Request $request) {
        $mapSettings = $request->all();
        return DB::table('maps_user_settings')->where('id', $mapSettings['id'])->update($mapSettings);
    }

    public function createMapSetting(Request $request) {
        $mapSettings = $request->all();
        return DB::table('maps_user_settings')->insertGetId($mapSettings);
    }

    public function fetchFavourites() {
        if ($user = session('user'))
            return Favourite::where('user_id', $user['id'])->orderBy('pos')->get();
    }

    public function createFavourite(Request $request) {
        $favourite = $request->all();
        return Favourite::insertGetId($favourite);
    }

    public function updateFavourite(Request $request) {
        $favourite = $request->all();
        return Favourite::where('id', $favourite['id'])->update($favourite);
    }

    public function deleteFavourite(Request $request) {
        $favourites = $request->all();
        Favourite::where('id', '=', $favourites['id'])->delete();
    }
}
?>
