<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;

class CategoryController extends Controller {
    public function fetchCategorys($userID) {
        return Category::where('user_id', $userID)->orderBy('pos')->get();
    }

    public function createCategory(Request $request) {
        $category = $request->all();
        return Category::create($category);
    }

    public function updateCategory(Request $request) {
        $category = $request->all();
        $toSave = Category::find($category['id']);
        $toSave->update($category);
        return Category::find($category['id']);
        // return [$toSave, Category::find($category['id']), $category];
    }

    public function deleteCategory(Request $request) {
        $category = $request->all();
        Category::find($category['id'])->delete();
    }

    public function updatePositions(Request $request) {
        $categorys = $request->all();
        $pos = 0;

        foreach ($categorys as $category) {
            $category['pos'] = $pos++;
            Category::find($category['id'])->update($category);
        }
    }
}
