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
        $liam_favs = [
            ['title'=>'Reddit',          'user_id'=>'1',     'url'=>'https://www.reddit.com/',                                   'src'=>'Reddit.png',        'pos'=>'0'],
            ['title'=>'Youtube',         'user_id'=>'1',     'url'=>'https://www.youtube.com/feed/subscriptions',                'src'=>'youtube.png',       'pos'=>'1'],
            ['title'=>'Netflix',         'user_id'=>'1',     'url'=>'https://www.netflix.com/browse',                            'src'=>'netflix.png',       'pos'=>'2'],
            ['title'=>'Banking',         'user_id'=>'1',     'url'=>'https://easyweb.td.com/waw/idp/login.htm?execution=e1s1',   'src'=>'TD-bank-icon.png',  'pos'=>'3'],
            ['title'=>'Google Drive',    'user_id'=>'1',     'url'=>'https://drive.google.com/drive/my-drive',                   'src'=>'googleDrive.png',   'pos'=>'4'],
            ['title'=>'Google Maps',     'user_id'=>'1',     'url'=>'https://www.google.ca/maps?hl=en&tab=wl',                   'src'=>'maps.png',          'pos'=>'5'],
            ['title'=>'Courselink',      'user_id'=>'1',     'url'=>'https://courselink.uoguelph.ca/d2l/home',                   'src'=>'guelph-icon.png',   'pos'=>'6'],
            ['title'=>'Github',          'user_id'=>'1',     'url'=>'https://github.com/',                                       'src'=>'gitIcon.png',       'pos'=>'7']
        ];

        foreach($liam_favs as $fav)
            DB::table('favourites')->insert($fav);
    }
}
