const mongoose = require('mongoose');


const CalorieCalculator = new mongoose.Schema ({
    calorie: {type: Number},
    fats: {type: Number},
    protein: {type: Number},
    food: {type: String}
});

const Bmi = new mongoose.Schema ({
    height: {type: Number},
    weight: {type: Number},
    age: {type: Number},
    sex: {type: String},
    total_body: {type: Number},
    percentage: {type: Number}
});

const BodyWater = new mongoose.Schema ({
    height: {type: Number},
    weight: {type: Number},
    result: {type: Number},
    suggestion: {type: String}
});

// const ProfileSchema = new mongoose.Schema({
//     pic: { type: String},
//     location: {type: String},
//     bio: {type: String},
//     social: {instagram: {type: String},twitter: {type: String}}
// });

const UserSchema = new mongoose.Schema({
    img: {data: Buffer, contentType: String},
    firstName: { type: String},
    lastName: { type: String},
    email: {type: String, required: [true, "can't be blank"], unique: true, index: true},
    password: { type: String, required: true },
    avatar: {type: String},
    pic: {type: String},
    location: {type: String},
    bio: {type: String},
    instagram: {type: String},
    twitter: {type: String},
    data: {CalorieCalculator: CalorieCalculator, Bmi, BodyWater},
}, {timestamps: true}, {collection: "users"});

module.exports = mongoose.model("User", UserSchema);