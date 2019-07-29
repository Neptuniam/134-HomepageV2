<?php

use Illuminate\Database\Seeder;

class AddNewsAndNotes extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $widgets = [
            ['user_id' => '1',  'title' => 'News',   'status' => '1'],
            ['user_id' => '1',  'title' => 'Notes',  'status' => '0'],
        ];

        foreach ($widgets as $widget)
            DB::table('widgets')->insert($widget);
    }
}
