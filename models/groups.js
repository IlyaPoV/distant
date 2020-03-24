const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lessons: [
        {
            lesson: {
                ref:'lesson',
                type: Schema.Types.ObjectId
            }
        }
    ],  
    teacher: {
        ref: 'users',
        type: Schema.Types.Mixed
    },
    teacherId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('groups', groupSchema)