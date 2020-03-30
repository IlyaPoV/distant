const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    discordId: {
        type: String,
        default:""
    },  
    teacher: {
        ref: 'users',
        type: Schema.Types.Mixed
    },
    teacherId: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    schedule: {
        type: String
    }
});

module.exports = mongoose.model('groups', groupSchema)