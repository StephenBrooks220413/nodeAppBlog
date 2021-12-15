const User = require('../models/User');

module.exports = async (req, res)=>{
    const User = await User.findById(req.params.id)
    res.render('profile', {
        User
    })
}