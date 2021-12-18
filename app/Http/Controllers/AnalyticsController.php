<?php

namespace App\Http\Controllers;

use App\Analytics;

use Illuminate\Http\Request;

class AnalyticsController extends Controller {
    public function fetchEvents(Request $request) {
        $payload = $request->all();

        if (isset($payload['from']) && isset($payload['to'])) {
            return Analytics::where('created_at', '>=', $payload['from'])
                ->where('created_at', '<=', $payload['to'])
                ->get();
        }
        return Analytics::get();
    }

    public function addEvent(Request $request) {
        $event = $request->all();

        // Caller provides api details, phps session knows the user already
        $event['user_id'] = session('user')['id'];

        return Analytics::create($event);
    }
}
