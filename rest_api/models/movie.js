const mongoose=require("mongoose");

const movieSchema=mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: String,
    year: Number
});

module.exports=new mongoose.model("Movie",movieSchema);