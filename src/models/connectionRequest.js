const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require: true
    },
    status:{
        type: String,
        enum:{
            values: ["interested", "ignored"],
            message: "{VALUE} isnt correct."
        }
    }
}, {timestamps:true})

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})



const ConnectionRequestModel = mongoose.model("connecionRequests", connectionRequestSchema);

module.exports = ConnectionRequestModel;