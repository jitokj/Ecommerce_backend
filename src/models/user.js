const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    contactNumber: {
        type: String,

    },
    profilePicture: {
        type: String
    },

},{timestamps: true});

userSchema.virtual('password')
.set(function(v){
  this.hash_password =   bcrypt.hashSync(v, saltRounds);
   
});

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
}

module.exports = mongoose.model("User",userSchema);