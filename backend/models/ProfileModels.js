const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    social: {
        instagram: {
            type: String
        },
        twitter: {
            type: String 
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// module.exports = Profile = mongoose.model("Profile", ProfileSchema)