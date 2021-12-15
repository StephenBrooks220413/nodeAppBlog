const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Please provide username']
    },
    password: {
        type: String,
        requried: true,
        required: [true, 'Please provide password']
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    image: String
})

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash 
        next()
    })
})

UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema);
module.exports = User;
