const express = require('express');
const path = require('path');

const app= express();

const port = 4000;

app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'))
app.use('css', express.static(__dirname + 'public/css'));
app.use('js', express.static(__dirname + 'public/js'));
app.use('assets', express.static(__dirname + 'public/assets'));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// JSON request body parser
app.use(express.json());
// URL-encoded request body parser
app.use(express.urlencoded({ extended: true })); 


//routes
app.use('/', require('./routes/movies'));
app.use('/add', require('./routes/addMovies'));
app.use('/account', require('./routes/account'));
app.use('/pay', require('./routes/pay'));
app.use('/paymentCallback', require('./routes/paymentCallback'));




app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
