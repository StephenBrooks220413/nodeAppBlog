const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb+srv://webDeveloper:WCg1g4mYb2N774RG@cluster0.uarj4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useNewUrlParser: true}
)

BlogPost.create({
    title: "Node Apps for fun",
    body: "Message in the post page",
    email: "krammer_439@msn.com",
    username: "Stephen Brooks"
}, (error, blogpost)=>{
    console.log(error, blogpost)
})

BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
})