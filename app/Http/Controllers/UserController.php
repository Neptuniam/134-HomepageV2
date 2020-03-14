<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Users;

class UserController extends Controller {
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
        return Users::get();
    }
}
