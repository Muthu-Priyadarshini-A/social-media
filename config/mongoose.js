const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1/codeial_development');

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,"Error connecting to Mongodb"));

//up and running then print the message
db.once('open',function(){
	console.log('Connected to DB::MongoDB');
});

module.exports= db;