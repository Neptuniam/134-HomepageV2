<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApiEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_events', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('user_id')->nullable(false);
            $table->string('api', 100)->nullable(false);
            $table->tinyInteger('hit_source')->nullable(false)->default('0');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('api_events');
    }
}
