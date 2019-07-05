<?php

use Illuminate\Database\Seeder;

class seed_users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'User',
            'pass' => 'user'
        ]);
    }
}
