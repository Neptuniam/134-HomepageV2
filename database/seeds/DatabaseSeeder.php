<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(seed_users::class);
        $this->call(WidgetSeeder::class);
        $this->call(seed_favourites::class);
    }
}
