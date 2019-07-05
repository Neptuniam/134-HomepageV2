Welcome to the 134 Homepage V2 rebuilt in VueJS and Laravel

Features included in this version of the homepage include:
    * Local Weather forecast
    * Maps Directions api
    * Custom favourites links
    * Soon: Calendar tracking
    * Real time date/time

    * Configuring custom widget settings
    * Personalized map locations
    * Personalized Favourites
    * Separate user profiles


How to Install
    Run the following commands
    1. git clone https://github.com/Neptuniam/134-HomepageV2
    2. npm install
    3. composer install
    4. cp .env.example .env

    Configure Database settings in .env
        Create a database called what you'd like
        change these three lines in .env:
            DB_DATABASE=<the db you just created>
            DB_USERNAME=<your mysql username>
            DB_PASSWORD=<your mysql password (if needed)>

    Finalize your .env set up (I think you need to rerun this whenever you change .env)
    5. php artisan key:generate

    Set up your db with these commands
    Create the tables
    6. php artisan migrate

    Seed the tables with necessary data.
    This will create a profile with the user: 'User' and pass: 'user' and Liams favourites bar
    7. php artisan db:seed

    You should be set to run the project now

Running
    Depending on your current needs there are two approaches:

    Using the homepage:
        npm run development (this builds the mot recent JavaScript, will take a minute)
        php artisan serve (this hosts the local server)

    Developing. This involves using two tabs to host a hot build to rebuild the js as you make changes and the local server
        npm run watch-poll (this will take a minute)
        php artisan serve

        Note: You will likely have to refresh once the js is rebuilt to see your changes
