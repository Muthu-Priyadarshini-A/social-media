const express = require('express');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// extract styles and scripts from subpages into the layouts:
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use the above layouts
app.use(expressLayouts);



//set view engine to ejs
app.set('view engine','ejs');

//add the path of the views folder to views
app.set('views', './views');

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/', require('./routes'));

//make app listen to this port
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }

        console.log(`Server is running on port:${port}`)

});

 