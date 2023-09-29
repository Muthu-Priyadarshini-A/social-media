const express = require('express');

const app = express();
const port = 8000;

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

 