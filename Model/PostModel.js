const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
  
    Image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "auth"
    }

})

module.exports = mongoose.model("Post",PostSchema)