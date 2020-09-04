<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Widget;

class WidgetController extends Controller {
    public function fetchWidgets($userID) {
        return Widget::where('user_id', $userID)->get();
    }

    public function updateWidget(Request $request) {
        $widget = $request->all();
        Widget::find($widget['id'])->update($widget);
    }
}
