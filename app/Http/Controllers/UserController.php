<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Users;

class UserController extends Controller {
    public function createUser(Request $request) {
        request()->validate([
            'name' => 'unique:users'
       ]);


        $newUser = $request->all();

        // Create a row for them in the users table
        $user = Users::insertGetId($newUser);

        // Create widgets setting for the user
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Weather', '1']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Maps', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Favourites', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'News', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Notes', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'QOTD', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Background', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Trello', '0']);
        DB::insert('insert into widgets (user_id, title, status) values (?, ?, ?)', [$user, 'Analytics', '0']);


        // Create their maps preferences row
        DB::insert('insert into maps_user_settings (user_id) values (?)', [$user]);

        // Provide default news categories
        DB::insert('insert into news_categorys (user_id, title, pos) values (?, ?, ?)', [$user, 'General', '0']);
        DB::insert('insert into news_categorys (user_id, title, pos) values (?, ?, ?)', [$user, 'Technology', '1']);
        DB::insert('insert into news_categorys (user_id, title, pos) values (?, ?, ?)', [$user, 'Science', '2']);
        DB::insert('insert into news_categorys (user_id, title, pos) values (?, ?, ?)', [$user, 'Entertainment', '3']);

        return $user;
    }
    public function updateUser(Request $request) {
        $user = $request->all();

        Users::find($user['id'])->update($user);
    }
    public function deleteUser($userId) {
        Users::find($userId)->delete();
    }

    public function setUser($userId) {
        // $userId = $request->all();
        $user = Users::find($userId);
        logger($user);

        session(['user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'pass' => $user['pass']
            ]
        ]);
    }

    public function fetchUsers() {
        return Users::get();
    }


    public function login(Request $request) {
        $user = $request->all();

        $exists = Users::where('name', $user['name'])->where('pass', $user['pass'])->first();

        // If the requested user exists, set it as the session user for other controllers
        if ($exists) {
            session(['user' => $user]);
            return $exists;
        } else {
            abort(505);
        }

    }
}
