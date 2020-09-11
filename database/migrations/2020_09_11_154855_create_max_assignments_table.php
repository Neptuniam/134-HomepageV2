<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaxAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('max_assignments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer("course_id");
            $table->string("assignment_name",150);
            $table->timestamp("assignment_dueDate");
            $table->tinyInteger("assignment_status")->default("0");
            $table->integer('priority');
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
        Schema::dropIfExists('max_assignments');
    }
}
