<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Location;
use App\MapsUserSettings;

class LocationController extends Controller {
    public function fetchLocations($userID) {
        return Location::where('user_id', $userID)->get();
    }

    public function createLocation(Request $request) {
        $location = $request->all();
        return Location::create($location);
    }

    public function updateLocation(Request $request) {
        $location = $request->all();
        Location::find($location['id'])->update($location);
        return Location::find($location['id']);
    }

    public function deleteLocation(Request $request) {
        $location = $request->all();
        Location::find($location['id'])->delete();
    }


    // MapsSettings
    public function fetchMapSettings($userID) {
        return MapsUserSettings::where('user_id', $userID)->get();
    }

    public function updateMapSettings(Request $request) {
        $mapSettings = $request->all();
        
        if (isset($mapSettings['id']) && $mapSettings['id'] > 0) {
            MapsUserSettings::find($mapSettings['id'])->update($mapSettings);
        } else {
            MapsUserSettings::create($mapSettings);
        }
        
        return MapsUserSettings::find($mapSettings['id']);
    }

    public function createMapSetting(Request $request) {
        $mapSettings = $request->all();
        return MapsUserSettings::create($mapSettings);
    }
}
