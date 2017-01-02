'use strict';
const path = require('path');
const express = require('express');
const app = express();
module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.

 Adding in two exceptions for /sitemap.xml and /robots.txt since both should be
 accessible to bots and crawlers for SEO purposes
 */

const validDomains = ['issue-advisors', 'become-a-mentor', 'calendar', 'campuses',
	'contact-us', 'get-the-kinetic-handbook', 'history', 'launch-a-chapter',
	'kinetic-global-leadership', 'login', 'issue-mentors', 'mission',
	'nominamte-an-expert', 'press', 'kinetic-global-resources', 'signup',
	'support', 'our-supporters', 'kinetic-template', 'webinars'];

app.use(function (req, res, next) {
	if (req.path === '/robots.txt'){
		res.sendFile(path.join(__dirname + '/robots.txt'));
	} else if (req.path === '/sitemap.xml') {
		res.sendFile(path.join(__dirname + '/sitemap.xml'));
	} else {
		if (path.extname(req.path).length > 0 || (req.path !== "/" &&  !validDomains.includes(req.path.substring(1)))) {
			res.sendFile(path.join(__dirname, './views/404.html'));
			res.status(404);
	    } else {
	        next(null);
	    }
	}
});


app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
