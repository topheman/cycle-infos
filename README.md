cycle-infos-fullstack
=====================
This project was scaffolded with yeoman and its angular-fullstack generator. More on this blog post.

Needed :

* NodeJS
* Sass / Compass `gem install compass`
* Grunt - see [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)
* Bower

First, go to [https://developer.jcdecaux.com](https://developer.jcdecaux.com) and get an api key.

Then :

1. `npm install` (to install all node_modules needed for dev and prod)
2. `bower install` (to install the front dependencies)
3. `grunt copy:config` (will create the config files in `lib/config/env` from the template)
	* in `lib/config/env/development.js`, set your correct apiKey (do as well with production if you want your apiKey in this config file when you'll build).
4. `grunt serve` - you're ready to go.

When you want to make a build version, just `grunt build`

To test this built version, set your NODE_ENV to "production"

* `SET NODE_ENV=production` (windows)
* `export NODE_ENV=production` (linux / OS X)

Make sure to put it back no "development" when you get back to testing.