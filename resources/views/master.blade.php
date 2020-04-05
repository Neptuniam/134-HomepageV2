<!DOCTYPE html>
<html>
    <head>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <!-- <meta name="csrf-token" content="{{csrf_token()}}"> -->

        <title>
            HomepageV2
        </title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto|Arima+Madurai" rel="stylesheet">

        <!-- Weather icons -->
        <link rel="stylesheet" href="weatherIcons/weather-icons.css">
        <link rel="stylesheet" href="weatherIcons/weather-icons-wind.css">

        <!-- Main CSS stylesheet -->
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="main.css">
    </head>
    <body>
        <div id='app'>
            <maindisplay />
        </div>
    </body>
</html>
