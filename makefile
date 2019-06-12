all: buildDev

buildDev:
	php artisan serve --port=8001 &
	npm run watch-poll &

kill:
	kill %1
	kill %2
