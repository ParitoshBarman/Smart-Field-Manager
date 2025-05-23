const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserFLDTRACK", // Reference to User model
        required: true 
    },
    BusinessName: { type: String, required: true },
    BusinessRepresentative: { type: String, required: true },
    RepresentativePhone: { type: String, required: true },
    BusinessPhone: { type: String, required: true },
    location: { type: String, required: true },
    businessImage: { type: String, required: false },
    representativePhoto: { type: String, required: false },
    selfiePhoto: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BusinessContact", contactSchema);
