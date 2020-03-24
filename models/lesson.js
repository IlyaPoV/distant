const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    list: [
        {
            name:{
                type: String,
                require: true
            },
            task: {
                type: String,
                require: true
            },
        }
    ],
    user: {
        ref:'users',
        type: Schema.Types.ObjectId
    },
    group:{
        ref: 'groups',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('lesson', lessonSchema)