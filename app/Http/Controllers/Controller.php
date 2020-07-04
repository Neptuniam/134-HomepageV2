<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function UploadFile($path, $file) {
        $fileSrc = explode(',', $file['src'])[1];
        $fileDecoded = base64_decode($fileSrc);
        $filepath = $path . $file['name'];

        if (!\file_exists($path)) {
          // make folders if they don't exist
          \mkdir($path, 0777, true);

          // this is needed, otherwise the folder will be fully owned by
          // www-data and you can't make changes to it
          \chmod($path, 0777);
        }

        file_put_contents($filepath, $fileDecoded);
    }

    public function DeleteFile($path) {
        if (!empty($path) && \file_exists(public_path($path))) {
            \unlink(public_path($path));
        }
    }
}
