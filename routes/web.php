<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
*/

Route::get('/', function () {
    return view('master');
});

Route::group(['prefix'=>'background'], function(){
    Route::get('/','Background@getBackground');
    Route::get('/all','Background@getList');
    Route::post('/upload', 'Background@upload');
    Route::post('/delete', 'Background@delete');
});


// Route::group(['prefix'=>'settings'], function(){
    Route::group(['prefix'=>'users'], function(){
        Route::get('/','UserController@fetchUsers');
        Route::put('/','UserController@setUser');
        Route::post('/','UserController@createUser');
    });

    Route::group(['prefix'=>'widgets'], function(){
        Route::get('/','WidgetController@fetchWidgets');
        Route::put('/','WidgetController@updateWidget');
    });

    Route::group(['prefix'=>'locations'], function(){
        Route::get('/', 'LocationController@fetchLocations');
        Route::post('/','LocationController@createLocation');
        Route::put('/', 'LocationController@updateLocation');
        Route::put('/delete', 'LocationController@deleteLocation');

        Route::get('/settings', 'LocationController@fetchMapSettings');
        Route::put('/settings', 'LocationController@updateMapSettings');
    });

    Route::group(['prefix'=>'favourites'], function(){
        Route::get('/', 'FavouriteController@fetchFavourites');
        Route::post('/','FavouriteController@createFavourite');
        Route::put('/', 'FavouriteController@updateFavourite');
        Route::put('/delete', 'FavouriteController@deleteFavourite');

        Route::put('/updatePositions', 'FavouriteController@updatePositions');
        Route::post('/upload', 'FavouriteController@upload');
    });

    Route::group(['prefix'=>'news'], function(){
        Route::group(['prefix'=>'categorys'], function() {
            Route::get('/', 'CategoryController@fetchCategorys');
            Route::post('/create','CategoryController@createCategory');
            Route::put('/', 'CategoryController@updateCategory');
            Route::put('/delete', 'CategoryController@deleteCategory');

            Route::put('/updatePositions', 'CategoryController@updatePositions');
        });
    });
// });

Route::group(['prefix'=>'notes'], function(){
    Route::get('/', 'NotesController@fetchNotes');
    Route::post('/','NotesController@createNote');
    Route::put('/', 'NotesController@updateNote');
    Route::put('/delete', 'NotesController@deleteNote');
});
