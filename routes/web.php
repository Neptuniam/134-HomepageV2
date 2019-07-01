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
});


Route::group(['prefix'=>'settings'], function(){
    Route::group(['prefix'=>'widgets'], function(){
        Route::get('/','Settings@fetchWidgets');
        Route::put('/','Settings@updateWidget');
    });

    Route::group(['prefix'=>'locations'], function(){
        Route::get('/', 'Settings@fetchLocations');
        Route::post('/','Settings@createLocation');
        Route::put('/', 'Settings@updateLocation');
        Route::put('/delete', 'Settings@deleteLocation');

        Route::get('/settings', 'Settings@fetchMapSettings');
        Route::put('/settings', 'Settings@updateMapSettings');
    });

    Route::group(['prefix'=>'favourites'], function(){
        Route::get('/', 'Settings@fetchFavourites');
        Route::post('/','Settings@createFavourite');
        Route::put('/', 'Settings@updateFavourite');
        Route::put('/delete', 'Settings@deleteFavourite');
    });

    Route::group(['prefix'=>'users'], function(){
        Route::get('/user','Settings@fetchUser');
        Route::put('/user','Settings@setUser');
        Route::get('/','Settings@fetchUsers');
        Route::put('/','Settings@updateUser');
    });
});
