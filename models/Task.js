const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'en cours',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
