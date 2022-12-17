<!DOCTYPE html>
<html>
    <head>
        <script src="{{ asset('js/app.js') }}" defer></script>

        <title>
            HomepageV2
        </title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Poiret+One|Roboto|Arima+Madurai" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">

        <!-- Weather icons -->
        <link rel="stylesheet" href="weatherIcons/weather-icons.css">
        <link rel="stylesheet" href="weatherIcons/weather-icons-wind.css">

        <!-- Main CSS stylesheet -->
        <link rel="stylesheet" type="text/css" href="css/main.css">

        <!-- <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"></script> -->

        <div id="TradingViewPort" style="visibility: hidden">
            <div class="tradingview-widget-container">
                <div class="tradingview-widget-container__widget"></div>
                <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
                    {
                        "symbol": "TSX:VFV",
                        "width": 350,
                        "height": 160,
                        "locale": "en",
                        "dateRange": "1D",
                        "colorTheme": "light",
                        "trendLineColor": "rgba(41, 98, 255, 1)",
                        "underLineColor": "rgba(41, 98, 255, 0.3)",
                        "underLineBottomColor": "rgba(41, 98, 255, 0)",
                        "isTransparent": false,
                        "autosize": false,
                        "largeChartUrl": ""
                    }
                </script>
            </div>
        </div>
    </head>
    <body>
        <div id='app'>
            <maindisplay />
        </div>
    </body>
</html>
