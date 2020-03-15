<?php

use Illuminate\Database\Seeder;

class WidgetSeeder extends Seeder {
    /**
     * Run the database seeds.
     * @return void
     */
    public function run() {
        $widgets = [
            ['user_id' => '1',  'title' => 'Background'],
            ['user_id' => '1',  'title' => 'Weather'],
            ['user_id' => '1',  'title' => 'Maps'],
            ['user_id' => '1',  'title' => 'Favourites'],
            // ['user_id' => '1',  'title' => 'Calendar'],
            ['user_id' => '1',  'title' => 'News'],
            ['user_id' => '1',  'title' => 'Notes'],
            ['user_id' => '1',  'title' => 'QOTD'],
        ];

        foreach ($widgets as $widget)
            DB::table('widgets')->insert($widget);
    }
}
