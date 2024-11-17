const mongoose = require('mongoose')
const {Schema} = mongoose

const contactSchema = new Schema({
    firstName : {
        type:String,
        required:true,
    },
    lastName : {
        type:String,
        required:true,

    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:Number,
        required:true,
    },
    company: {
        type:String,
    },
    jobTitle: {
        type:String,
    }

})

module.exports = mongoose.model('Contacts',contactSchema)