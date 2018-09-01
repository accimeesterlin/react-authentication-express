const express = require('express');
const app = express();
const PORT = process.env.PORT || 9001;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Importing Files
const User = require('./models/user');


mongoose.connect('mongodb://localhost/my_db_authentication', { useNewUrlParser: true });


app.use(cookieParser()); // set cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({
        message: 'Ok'
    });
});


app.post('/signup', (req, res) => {

    const { email, password } = req.body;
    console.log('Body: ', req.body);

    const salt = bcrypt.genSaltSync(10); // salt

    if (!req.body.email) {
        res.status(401).json({
            message: 'No Email provided'
        });
    }

    if (!req.body.password) {
        res.status(401).json({
            message: 'No Password provided'
        });
    }

    const encryptedPassword = bcrypt.hashSync(password, salt); // long encrypted password

    User.init()
        .then(() => {

            User.create({
                email,
                password: encryptedPassword
            })
                .then(function (user) {
                    // Created User


                    res.cookie('id', user._id).json({
                        message: 'User Created',
                        isAuthenticated: true,
                        id: user._id
                    });
                })
                .catch(function () {
                    res.status(401).json({
                        message: 'Sorry, user already existed',
                        isAuthenticated: false
                    });
                });
        })
        .catch(() => {
            res.status(401).json({
                message: 'Internal Issues',
                isAuthenticated: false
            });
        }); 
});



app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: 'No user found',
                    isAuthenticated: false
                });
            }

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

            if (isPasswordValid) {

                return res.cookie('id', user._id).json({
                    message: 'Welcome back to the app',
                    isAuthenticated: true,
                    id: user._id
                })
            }

            res.status(401).json({
                message: 'Password or Email is not correct',
                isAuthenticated: false,
            });

        })
        .catch((error) => {
            res.status(500), json({
                message: 'Internal Error',
                isAuthenticated: false
            });
        });

});



app.get('/profile', (req, res) => {

    console.log('COOKIES: ', req.cookies);
    const id = req.cookies.id;

    User.findOne({ _id: id })
        .select('-password')
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.status(401).json(error);
        });
});


app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
});