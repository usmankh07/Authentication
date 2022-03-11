const express = require('express');
const session = require('express-session');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
require('./oauth')
require('dotenv').config();
const app = express();
app.set('view engine', 'ejs')
const port = process.env.PORT
const User = require('./model/user');

const database_link = process.env.MONGODB_LINK  

mongoose.connect(database_link, () => {
  console.log(`Database is connected!`);
})


function isLoggedIn(req, res, next) {
  // The next just tell us to move forward.
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.render('./pages/registration.ejs')
});



app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }
));
app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


// Facebook Authentication
app.get('/auth/facebook', passport.authenticate('facebook')); 

app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/protected/fb',
    failureRedirect: '/google/failure'
  })
)

app.get('/protected/fb', isLoggedIn, (req, res) => {  
  res.send(`Hello ${req.user.name}`);
})


// Github Authentication
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/github/callback', 
  passport.authenticate('github', { 
    successRedirect: '/protected/github',
    failureRedirect: '/login' }),

);
app.get('/protected/github', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`)
})


app.listen(port, () => {
  console.log(`App is running at port ${port}`)
});