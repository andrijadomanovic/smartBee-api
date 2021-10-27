const express = require('express');
const bcrypt = require('bcrypt'); 
const cors = require('cors');
const knex = require('knex');


// Controlers
const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile= require('./controlers/profile');
const image = require('./controlers/image');


// database conection
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'postgres'
    }
  });
  db.select('*').from('users');

const app = express();
app.use(express.json());
app.use(cors());


/*-------------------------------------- ROUTES -----------------------------*/

app.get('/', (req, res)=> {res.send(database.users);});

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req,res)=>{register.handleRegister(req, res, db, bcrypt), register.handleImage(req, res, db)})

app.get('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res)=> {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)});


app.listen(process.env.PORT || 3000, () => {
  console.log(`app running in port ${process.env.PORT}`);
});


/*
/--> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
kako da dohvatim record
kako da obrisem
*/ 