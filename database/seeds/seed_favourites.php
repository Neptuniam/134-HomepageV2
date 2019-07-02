<?php

use Illuminate\Database\Seeder;

class seed_favourites extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('favourites')->insert(
            ['name'=>'Reddit',          'url'=>'https://www.reddit.com/',                                   'src'=>'Reddit.png',        'pos'=>'0', 'user_id'=>'1'],
            ['name'=>'Youtube',         'url'=>'https://www.youtube.com/feed/subscriptions',                'src'=>'youtube.png',       'pos'=>'1', 'user_id'=>'1'],
            ['name'=>'Netflix',         'url'=>'https://www.netflix.com/browse',                            'src'=>'netflix.png',       'pos'=>'2', 'user_id'=>'1'],
            ['name'=>'Banking',         'url'=>'https://easyweb.td.com/waw/idp/login.htm?execution=e1s1',   'src'=>'TD-bank-icon.png',  'pos'=>'3', 'user_id'=>'1'],
            ['name'=>'Google Drive',    'url'=>'https://drive.google.com/drive/my-drive',                   'src'=>'googleDrive.png',   'pos'=>'4', 'user_id'=>'1'],
            ['name'=>'Google Maps',     'url'=>'https://www.google.ca/maps?hl=en&tab=wl',                   'src'=>'maps.png',          'pos'=>'5', 'user_id'=>'1'],
            ['name'=>'Courselink',      'url'=>'https://courselink.uoguelph.ca/d2l/home',                   'src'=>'guelph-icon.png',   'pos'=>'6', 'user_id'=>'1'],
            ['name'=>'Github',          'url'=>'https://github.com/',                                       'src'=>'gitIcon.png',       'pos'=>'7', 'user_id'=>'1']
        );
    }
}
