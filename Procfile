web: gunicorn ignat.wsgi:application --log-file -
web: webpack --config webpack-production.config.js & NODE_ENV=production PORT=8001 node entry.js