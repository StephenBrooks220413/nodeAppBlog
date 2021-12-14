const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');

require('dotenv').config()

app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// DB
mongoose.connect(process.env.DB_URL)
if(mongoose){
    console.log("DB connected")
} else {
    console.log("Error in connecting to DB")
}

// styles & scripts
app.use(express.static('public'));

app.listen(3000, () => {
    console.log("app listening")
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/posts/new', (req, res)=>{
    res.render('create')
})

app.post('/posts/store', async (req, res)=>{
    await BlogPost.create(req.body)
    res.redirect('/blogs')
})

app.get('/blogs', async (req, res)=>{
    const blogposts = await BlogPost.find({}).sort({_id: -1}).limit({limit: 20});
    res.render('blogs',{
        blogposts
    })
})

app.get('/post/:id', async (req, res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})












// app.get('/notfound', (req, res)=>{
//     res.render('notfound')
// })