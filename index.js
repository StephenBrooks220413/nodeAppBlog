const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config()

app.set('view engine', 'ejs');

const validationMiddleWare = require('./middlewares/validationMiddleware')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash());
// app.use('/posts/store', validationMiddleWare)

// Controllers
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const blogsController = require('./controllers/blogs'); // get posts
const newPostController = require('./controllers/newPost', validationMiddleWare);
const storePostController = require('./controllers/storePost');
const singlePostController = require('./controllers/singlePost');
// user registeration and login / logout
const newUserContoller = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middlewares/authMiddleware');
const redirectIfAuthenticated = require('./middlewares/redirectIfAuthenticated');
const logoutController = require('./controllers/logout');

// DB
mongoose.connect(process.env.DB_URL)
if(mongoose){
    console.log("DB connected")
} else {
    console.log("Error in connecting to DB")
}

// styles & scripts
app.use(express.static('public'));
app.use(fileUpload());
app.use(expressSession({
    secret: 'w84ln8lru'
}));

app.listen(3000, () => {
    console.log("app listening")
})

// Page Routes handled by controllers folder
app.get('/', homeController)
app.get('/about', aboutController)

////////// Handling post request
app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/blogs', blogsController)

app.get('/post/:id', singlePostController)

/////////////////////////////////
global.loggedIn = null;

app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next();
});
////////// Handling registeration / login / logout
app.get('/auth/register', redirectIfAuthenticated, newUserContoller);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res)=> res.render('notfound'));