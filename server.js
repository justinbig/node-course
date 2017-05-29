const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text) => {
	return text.toUpperCase();
})
app.set('view engine','hbs');

// app.use(express.static(__dirname + '/public'));
app.get('/bad', (req,res) => {
    // res.send('<h1>hello justin</h2>');
    res.send({
    	name: 'justin',
    	likes:[
          'computing',
          'gaming',
          'and much more'
    	]
    })
});

app.use((req,res,next) => {
	var nowe = new Date().toString();
	var log = `${nowe} : ${req.method} ${req.url}`;
	fs.appendFile('server.log',log+ '\n', (err) => {
		if(err) {
		console.log('we were unable to connect to server');
		 }
	});
	console.log(log);
	next();
});

// app.use((req,res,next) => {
// 	res.render('mainten.hbs');
	
// })

app.get('/event', (req,res) => {
	res.render('event.hbs', {
		pageTitle: "iwacu niheza",
		
		welcomePage: 'twakuriye kanyosha'
	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		
		welcomePage: 'here we are you all welcome'
	});
})

app.get('/' ,(req,res) => {
	res.render('home.hbs', {
		pageTitle: "welcome Home",
		
		welcomePage: "welcome to my Home Page"
	})
})

app.listen(3000,() => {
	console.log('server is up running');
});