<!DOCTYPE html>
<html>
    <head>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <meta name="csrf-token" content="{{csrf_token()}}">

        <title>
            The 134 HomepageV2
        </title>

        <!-- UIkit JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.4/js/uikit.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.4/js/uikit-icons.min.js"></script>
        <!-- UIkit CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.4/css/uikit.min.css" />

        <!-- Flexbox Grid -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.css">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto|Arima+Madurai" rel="stylesheet">

        <!-- Markdown -->
        <script src="https://unpkg.com/marked@0.3.6"></script>
        <script src="https://unpkg.com/lodash@4.16.0"></script>
    </head>
    <body>
        <div id='app'>
            <maindisplay />
        </div>
    </body>
</html>
