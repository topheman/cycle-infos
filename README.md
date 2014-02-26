cycle-infos-fullstack
=====================

Test the project at [topheman-cycle-infos.herokuapp.com](http://topheman-cycle-infos.herokuapp.com)

This project was scaffolded with yeoman and its angular-fullstack generator.

There is a minimalist backend written in NodeJS, with express which calls the JCDecaux API to get the availability of their bikes and bike's stands in real time on their self-service bike offer.

The challenge was more in the frontent, to use AngularJS, inside the yeoman workflow, using different techs such as :

* the yeoman / grunt / bower stack
* sass with bootstrap
* google maps API
* build and send to heroku

More on this blog post (comming).

### Needed :

* NodeJS
* Sass / Compass `gem install compass`
* Grunt - see [gruntjs.com/getting-started](http://gruntjs.com/getting-started) `npm install grunt-cli -g`
* Bower `npm install bower -g`

First, go to [developer.jcdecaux.com](https://developer.jcdecaux.com) and get an api key.

### Init :

1. `npm install` (to install all node_modules needed for dev and prod)
2. `bower install` (to install the front dependencies)
3. `grunt copy:config` (will create the config files in `lib/config/env` from the template)
	* in `lib/config/env/development.js`, set your correct apiKey.

### Development :

`grunt serve` : Will launch the server with livereload.

### Production

To build your site : `grunt build`

Once you've built, to test in real : set your `NODE_ENV` to `production` (the server based on express needs to know that, also, if you host the solution, you would have to set it on your server).

* `SET NODE_ENV=production` (windows)
* `export NODE_ENV=production` (linux / OS X)

To launch your built solution : `node dist/server.js` then go to `http://localhost:3000`

Make sure to put back `NODE_ENV` the way it was ("development" or nothing) when you get back to testing.