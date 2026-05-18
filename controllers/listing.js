 const Listing = require("../models/listing");
 const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
 const mapToken = process.env.MAP_TOKEN;
 const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index= async(req,res)=>{
    let { category, search } = req.query;
    let query = {};
    if (category) {
        query.category = category;
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } }
        ];
    }
    const allListings = await Listing.find(query);
    res.render("listings/index.ejs",{allListings, selectedCategory: category || ""});
};

module.exports.renderNewForm= (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews",populate : { path : "author"},}).populate("owner");
    if(!listing){
      req.flash("error","Cannot find that listing!");  
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing= async(req,res,next)=>{
      let response = await geocodingClient.forwardGeocode({
         query: req.body.listing.location,
         limit: 1,
       }).send();

      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image={url,filename};
      newListing.geometry= response.body.features[0].geometry;

      // --- INTELLIGENT CATEGORY PREDICTOR ---
      if (req.body.listing.category === "auto" || !req.body.listing.category) {
          let assignedCategory = "Rooms";
          const title = (newListing.title || "").toLowerCase();
          const desc = (newListing.description || "").toLowerCase();
          
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
          } else {
              assignedCategory = "Trending";
          }
          newListing.category = assignedCategory;
      }
      // --------------------------------------

      let savedListing = await newListing.save();
      req.flash("success","Successfully made a new listing");
      res.redirect("/listings");
};

module.exports.renderEditForm= async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    if(!listing){
      req.flash("error","Cannot find that listing!");  
      res.redirect("/listings");
    }

    let originalImageUrl=listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_200");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing= async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    // --- UPDATE PREDICTED CATEGORY ON EDIT ---
    if (req.body.listing.category === "auto" || !req.body.listing.category) {
        const title = (req.body.listing.title || listing.title || "").toLowerCase();
        const desc = (req.body.listing.description || listing.description || "").toLowerCase();
        let assignedCategory = "Rooms";
        
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
        } else {
            assignedCategory = "Trending";
        }
        listing.category = assignedCategory;
    } else {
        listing.category = req.body.listing.category;
    }
    // -----------------------------------------

    if( typeof req.file !=="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image = {url,filename};
    }
    await listing.save();
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing= async(req,res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
     req.flash("success","Listing deleted successfully");
    res.redirect("/listings"); 
};