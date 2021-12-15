const BlogPost = require('../models/BlogPost'); 

module.exports = async (req, res)=>{
    const blogposts = await BlogPost.find({}).sort({_id: -1}).limit({limit: 20}).populate('userid');
    console.log(req.session)
    res.render('blogs',{
        blogposts
    })
}