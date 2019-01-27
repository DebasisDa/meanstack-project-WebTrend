const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const login = require('./routes/login');
const profile = require('./routes/profile');
const blog = require('./routes/blog');
const comment = require('./routes/comment');
const config = require('config');
let bodyParser = require('body-parser');
const helmet = require('helmet') // This is third party middleware.
const morgan = require('morgan') // This is thirdpparty middleware.


if(!config.get('jwtPrivateKey'))
{
    console.log('FATAL ERROR : jwtPrivateKey is not defined..')
    process.exit(1);
}

// connect with database
mongoose.connect('mongodb://localhost/project')
.then(() => console.log('connected with database ...'))
.catch( error => console.error('could not connect with database ...', error));

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());
app.use(helmet()) // Third party middleware.
app.use(morgan())  // Third party middleware.


app.use('/api/users',user);
app.use('/api/login',login);
app.use('/api/profile',profile);
app.use('/api/blogs',blog);
app.use('/api/blogs',comment);

/* This code abour port number */
const port = process.env.PORT||3000;
app.listen(port, () => console.log('Listening on the port' + port));


















