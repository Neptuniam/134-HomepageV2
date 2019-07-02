<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMapsSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('maps_user_settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->int('user_id')->nullable(false);
            $table->int('home_id');
            $table->int('fav_id');
            $table->string('method', 10)->default('DRIVING');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('maps_settings');
    }
}
