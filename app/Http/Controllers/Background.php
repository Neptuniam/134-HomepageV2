<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Background extends Controller {
    private function scanDirectory() {
        header("Access-Control-Allow-Origin: *");
        $dir = 'images/backgrounds';
        $files = scandir($dir);

        // Remove the first two elements
        array_shift($files);
        array_shift($files);

        return $files;
    }

    public function getBackground() {
        $files = $this->scanDirectory();
        $index = mt_rand(2, sizeof($files)-1);
        $path = 'backgrounds/' . $files[$index];

        return $path;
    }

    public function getList() {
        $list = $this->scanDirectory();
        $spliced = array_splice($list, 2);
        return $spliced;
    }

    public function upload(Request $request) {
        return $this->UploadFile('images/backgrounds/', $request['file']);
    }

    public function delete(Request $request) {
        return $this->DeleteFile('images/backgrounds/'.$request['name']);
    }
}
?>
