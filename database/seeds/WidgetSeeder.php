<?php

use Illuminate\Database\Seeder;

class WidgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $widgets = [
            ['user_id' => '1',  'title' => 'Weather',   'status' => '1'],
            ['user_id' => '1',  'title' => 'Maps',      'status' => '0'],
            ['user_id' => '1',  'title' => 'Favourites','status' => '1'],
            ['user_id' => '1',  'title' => 'Calendar',  'status' => '0']
        ];

        foreach ($widgets as $widget)
            DB::table('widgets')->insert($widget);
    }
}
