<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class Settings extends Controller {
    // Users
    public function fetchUser() {
        $user = DB::table('users')->where('active', 1)->get();
        return $user;
    }
    public function setUser(Request $request) {
        $user = $request->all();
        session(['user' => $user]);
    }

    public function fetchUsers() {
        return DB::table('users')->get();
    }

    public function updateUser(Request $request) {
        $user = $request->all();
        return DB::table('users')->where('id', $user['id'])->update($user);
    }

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
        return DB::table('maps_user_settings')->get();
    }

    public function updateMapSettings(Request $request) {
        $mapSettings = $request->all();
        return DB::table('maps_user_settings')->where('id', $mapSettings['id'])->update($mapSettings);
    }


    // Favourites
    public function fetchFavourites() {
        if ($user = session('user'))
            return DB::table('favourites')->where('user_id', $user['id'])->get();
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
