let mix = require('laravel-mix');

// mix.js('public/js/app.js').sass('public/css/app.css');


mix.js('resources/Js/app.js', 'public/js/app.js').sass('resources/scss/app.scss', 'public/css/app.css');



