const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user',
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'user',
    },
    status:{
        type: String,
        enum:{
            values: ["interested", "ignored", "accepted", "rejected"],
            message: "{VALUE} isnt correct."
        }
    }
}, {timestamps:true})

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})



const ConnectionRequestModel = mongoose.model("connectionRequests", connectionRequestSchema);

module.exports = ConnectionRequestModel;