const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        set : (v) =>
         v === "" 
        ?"https://media.istockphoto.com/id/155428937/photo/ranthambhore-np-in-rajasthan-india.jpg?s=2048x2048&w=is&k=20&c=bH3xj1NihK3Ty-mnW4yVPR0FmZgPCeE3KktJy8uPhvg="
         : v,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;