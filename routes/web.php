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

Route::group(['middleware' => ['cors']], function(){
    Route::group(['prefix'=>'analytics'], function() {
        Route::post('/', 'AnalyticsController@fetchEvents');
        Route::post('/add_event', 'AnalyticsController@addEvent');
    });

    Route::group(['prefix'=>'background'], function(){
        Route::get('/','Background@getBackground');
        Route::get('/all','Background@getList');
        Route::post('/upload', 'Background@upload');
        Route::post('/delete', 'Background@delete');
    });

    Route::group(['prefix'=>'users'], function(){
        Route::get('/','UserController@fetchUsers');
        Route::post('/','UserController@createUser');
        Route::put('/','UserController@updateUser');
        Route::delete('/{userId}','UserController@deleteUser');
        Route::put('/{userId}','UserController@setUser');
    });
    Route::group(['prefix'=>'user'], function(){
        Route::post('/login','UserController@login');
    });

    Route::group(['prefix'=>'widgets'], function(){
        Route::get('/{userId}','WidgetController@fetchWidgets');
        Route::put('/','WidgetController@updateWidget');
    });

    Route::group(['prefix'=>'locations'], function(){
        Route::get('/{userId}', 'LocationController@fetchLocations');
        Route::post('/','LocationController@createLocation');
        Route::put('/', 'LocationController@updateLocation');
        Route::put('/delete', 'LocationController@deleteLocation');

        Route::get('/settings/{userId}', 'LocationController@fetchMapSettings');
        Route::put('/settings', 'LocationController@updateMapSettings');
    });

    Route::group(['prefix'=>'favourites'], function(){
        Route::get('/{userid}', 'FavouriteController@fetchFavourites');
        Route::post('/','FavouriteController@createFavourite');
        Route::put('/', 'FavouriteController@updateFavourite');
        Route::put('/delete', 'FavouriteController@deleteFavourite');

        Route::put('/updatePositions', 'FavouriteController@updatePositions');
        Route::post('/upload', 'FavouriteController@upload');
    });

    Route::group(['prefix'=>'news'], function(){
        Route::group(['prefix'=>'categorys'], function() {
            Route::get('/{userid}', 'CategoryController@fetchCategorys');
            Route::post('/create','CategoryController@createCategory');
            Route::put('/', 'CategoryController@updateCategory');
            Route::put('/delete', 'CategoryController@deleteCategory');

            Route::put('/updatePositions', 'CategoryController@updatePositions');
        });
    });

    Route::group(['prefix'=>'notes'], function(){
        Route::get('/{userid}', 'NotesController@fetchNotes');
        Route::post('/','NotesController@createNote');
        Route::put('/', 'NotesController@updateNote');
        Route::put('/delete', 'NotesController@deleteNote');
    });

    Route::group(['prefix'=>'trello'], function(){
        Route::get('/{userid}', 'TrelloController@fetchTrellos');
        Route::post('/','TrelloController@createTrello');
        Route::put('/', 'TrelloController@updateTrello');
        Route::put('/delete', 'TrelloController@deleteTrello');
    });


    // For Max
    Route::group(['prefix'=>'courses'], function(){
        Route::get('/{userid}', 'CourseController@fetchCourses');
        Route::post('/','CourseController@createCourse');
        Route::put('/', 'CourseController@updateCourse');
        Route::delete('/{course_id}', 'CourseController@deleteCourse');
    });
    Route::group(['prefix'=>'assignments'], function(){
        Route::get('/{course_id}', 'AssignmentController@fetchAssignments');
        Route::get('/sorted/{user_id}', 'AssignmentController@fetchSortedAssignments');
        Route::post('/','AssignmentController@createAssignment');
        Route::delete('/{assignment_id}', 'AssignmentController@deleteAssignment');
        Route::put('/', 'AssignmentController@updateAssignment');
    });
});
Route::group(['middleware' => ['cors']], function(){

});
