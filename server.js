const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { user } = require('pg/lib/defaults');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       port : 5432,
//       user : 'tzechong',
//       password : '',
//       database : 'smart-brain'
//     }
//   });
  
// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running ${process.env.PORT}`);
})

app.get('/', (req, res)=> {
    res.send('success');
})

/* 
/ --> res = this is working
/signin --> POST = success/fail (why POST? when we send a password, we don't want to send as a query)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
// need to parse request first 
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

//register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db, bcrypt)});

app.put('/image', (req, res) => { image.handleImage(req, res, db )} );

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
