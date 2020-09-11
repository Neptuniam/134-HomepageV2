# HomepageV2
Welcome to the 134 Homepage V2 rebuilt in VueJS and Laravel with UIkit and flexboxgrid

------

### Features included in this version of the homepage include:
* Local Weather forecast
* Maps Directions api
* Personalized map locations
* Custom Favourites links
* Custom Notes App
* News API
* Quote of the Day
* Trello API Tracker
* Real time date/time
* Randomized custom wallpaper
* Separate user profiles
* Configuring custom widget settings
* Personalized Favourites Bar
* API usage analytics

------

### How to Install
1. ```git clone https://github.com/Neptuniam/134-HomepageV2```
2. ```npm install```
3. ```composer install```
4. ```cp .env.example .env```

5. Configure Database settings in .env  <br/>
    Create a database called what you'd like    <br/>
    change these three lines in .env:   <br/>
    ```
        DB_DATABASE=<the db you just created>
        DB_USERNAME=<your mysql username>
        DB_PASSWORD=<your mysql password (if needed)>
    ```

6. Finalize your .env set up (I think you need to rerun this whenever you change .env)  <br/>
    ```php artisan key:generate```

7. Set up your db with these commands   <br/>
    Create the tables   <br/>
        ```php artisan migrate```

8. Optional: Seed the tables with some of Liam's favourites. <br/>
    This will create a profile with the user: 'Liam' and pass: 'liam' and Liams favourites bar  <br/>
        ```php artisan db:seed```

You should be set to run the project now

------

### Running
#### Depending on your current needs there are two approaches:

1. Using the homepage:
```
    npm run development (this builds the mot recent JavaScript, will take a minute)
    php artisan serve (this hosts the local server)
```

2. Developing. This involves using two tabs to host a hot build to rebuild the js as you make changes and the local server
#### Note: You will likely have to refresh once the js is rebuilt to see your changes
```
    npm run watch-poll (this will take a minute)
    php artisan serve
```
