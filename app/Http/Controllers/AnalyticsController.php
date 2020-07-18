<?php

namespace App\Http\Controllers;

use App\Analytics;

use Illuminate\Http\Request;

class AnalyticsController extends Controller {
    public function addEvent(Request $request) {
        $event = $request->all();

        // Caller provides api details, phps session knows the user already
        $event['user_id'] = session('user')['id'];

        return Analytics::create($event);
    }
}
