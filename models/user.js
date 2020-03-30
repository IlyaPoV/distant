const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userSurname: {
        type: String,
        required: true
    },
    isTeacher: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    groupsList:[
            {   
                ref: 'groups',
                type: Schema.Types.ObjectId
                }
        
    ]
});

module.exports = mongoose.model('users', userSchema)