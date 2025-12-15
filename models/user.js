const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default || require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "username" });

module.exports = mongoose.model("User", UserSchema);