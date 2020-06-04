<?php
namespace App\Http\Controllers;

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
        return $this->scanDirectory();
    }
}
?>
