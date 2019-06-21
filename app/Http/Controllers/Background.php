<?php

namespace App\Http\Controllers;
//
// use Auth;
// use App\Feature;
// use App\Permission;
// use App\PluginSubMenu;
// use Illuminate\Http\Request;
use Storage;

class Background extends Controller {
    function getBackground() {
        header("Access-Control-Allow-Origin: *");
        $dir = 'images/backgrounds';
        $files = scandir($dir);

        $index = mt_rand(2, sizeof($files)-1);
        $path = 'backgrounds/' . $files[$index];

        return $path;
    }
}

  // getBackground();
?>
