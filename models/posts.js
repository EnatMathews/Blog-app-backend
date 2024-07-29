const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    message: String,
    postedDate: {
        type: Date,
        default: Date.now
    }
});

const postModel = Mongoose.model("posts", postSchema);
module.exports = postModel;
