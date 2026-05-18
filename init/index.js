const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
 
async function main() {
     await mongoose.connect(MONGO_URL);
}

const initDB = async ()=> {
    await Listing.deleteMany({});
    await User.deleteMany({});

    // Create a default admin user with the expected ID
    const adminUser = new User({
        _id: new mongoose.Types.ObjectId("693faf79b54408cb219d0a58"),
        email: "admin@wonderlust.com",
        username: "admin"
    });
    await User.register(adminUser, "admin123");
    console.log("default user seeded");

    initData.data = initData.data.map((obj, index) => {
        let assignedCategory = "Rooms";
        const title = (obj.title || "").toLowerCase();
        const desc = (obj.description || "").toLowerCase();
        
        if (title.includes("mountain") || desc.includes("mountain") || title.includes("ski") || title.includes("chalet") || title.includes("alps")) {
            assignedCategory = "Mountains";
        } else if (title.includes("pool") || desc.includes("pool") || title.includes("beach") || title.includes("beachfront") || title.includes("ocean") || title.includes("surf") || title.includes("maldives")) {
            assignedCategory = "Amezing pools";
        } else if (title.includes("camp") || desc.includes("camp") || title.includes("treehouse") || title.includes("nature") || title.includes("safari") || desc.includes("safari")) {
            assignedCategory = "Camping";
        } else if (title.includes("farm") || desc.includes("farm") || title.includes("cow") || title.includes("rustic") || title.includes("cottage")) {
            assignedCategory = "Farms";
        } else if (title.includes("castle") || desc.includes("castle") || title.includes("historic") || title.includes("villa") || title.includes("palace") || title.includes("brownstone")) {
            assignedCategory = "Castles";
        } else if (title.includes("boat") || title.includes("ship") || title.includes("canal") || title.includes("lake") || desc.includes("lake")) {
            assignedCategory = "Boats";
        } else if (title.includes("city") || title.includes("loft") || title.includes("apartment") || title.includes("tokyo") || title.includes("new york") || title.includes("downtown") || title.includes("miami")) {
            assignedCategory = "Iconic cities";
        } else if (title.includes("dome") || title.includes("igloo") || title.includes("desert") || title.includes("oasis")) {
            assignedCategory = "Domes";
        } else if (title.includes("arctic") || title.includes("snow") || title.includes("snowflake") || title.includes("polar")) {
            assignedCategory = "Arctic";
        } else if (index % 5 === 0) {
            assignedCategory = "Trending";
        }
        
        return {
            ...obj,
            owner: "693faf79b54408cb219d0a58",
            geometry: obj.geometry || { type: "Point", coordinates: [72.8777, 19.0760] },
            category: assignedCategory
        };
    });
    await Listing.insertMany(initData.data);
    console.log("data was initiallise");
}
initDB();