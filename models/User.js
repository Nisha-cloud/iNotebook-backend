const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')

            }
        }
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
            throw new Error('Password cannot contain "password"')
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String
        }
    }

    ]
})

userSchema.virtual('notes', {
    ref:'Note',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
    


})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
console.log("nisha")
user.tokens = user.tokens.concat({token})

await user.save()

    return token
}


userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

const User = mongoose.model('User', userSchema)




module.exports = User
