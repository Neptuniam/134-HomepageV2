<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Location;
use App\MapsUserSettings;

class LocationController extends Controller {
    public function fetchLocations() {
        if ($user = session('user'))
            return Location::where('user_id', $user['id'])->get();
    }

    public function createLocation(Request $request) {
        $location = $request->all();
        return Location::create($location);
    }

    public function updateLocation(Request $request) {
        $location = $request->all();
        return Location::find($location['id'])->update($location);
    }

    public function deleteLocation(Request $request) {
        $location = $request->all();
        Location::find($location['id'])->delete();
    }


    // MapsSettings
    public function fetchMapSettings() {
        if ($user = session('user'))
            return MapsUserSettings::where('user_id', $user['id'])->get();
    }

    public function updateMapSettings(Request $request) {
        $mapSettings = $request->all();
        return MapsUserSettings::find($mapSettings['id'])->update($mapSettings);
    }

    public function createMapSetting(Request $request) {
        $mapSettings = $request->all();
        return MapsUserSettings::create($mapSettings);
    }
}
