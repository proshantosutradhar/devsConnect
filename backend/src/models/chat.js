const mongoose = require('mongoose')


const messages = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require:true
    },
    text:{
        type: String
    }
}, {timestamps:true})

const chatSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    messages:[messages]

}, {timestamps:true})

const ChatModel = mongoose.model('Chat', chatSchema)

module.exports = ChatModel;