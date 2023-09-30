const express = require('express');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// extract styles and scripts from subpages into the layouts:
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use the above layouts
app.use(expressLayouts);

//use express router
app.use('/', require('./routes'));

//set view engine to ejs
app.set('view engine','ejs');

//add the path of the views folder to views
app.set('views', './views');

//make app listen to this port
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }

        console.log(`Server is running on port:${port}`)

});

 