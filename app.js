const express = require('express')
const path = require('path');
const router = express.Router();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const layouts = require('express-ejs-layouts');

mongoose.connect('mongodb://localhost:27017/Dictionary')
    .then(() => { console.log("Connect to DB") })
    .catch(() => { console.log("Connect DB Fail") })

const User = require('./models/user')

const app = express()

app.set('view engine', 'ejs')
app.use(layouts);
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ['25032002']
    })
)
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});
passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '/api/auth/google'
}, (accessToken, refreshToken, profile, done) => {
    if (profile.id) {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.name.familyName + ' ' + profile.name.givenName,
                        photo: profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('='))
                    })
                        .save()
                        .then(user => done(null, user));
                }
            })
    }
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('25032002'));
app.use('/', require('./router/api.router'))
app.use('/', require('./router/page.router'))

app.listen(3000)