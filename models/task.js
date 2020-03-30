const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    title: {
        type: String
    },
    tasksList: [
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
    lesson:{
        ref: 'lesson',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('task', taskSchema)