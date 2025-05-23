const Contact = require("../models/BusinessContact");

const createContact = async (req, res) => {
    // console.log(req.body)
    // console.log(req.files.businessImage[0].originalname)
    try {
        const { BusinessName, BusinessRepresentative, RepresentativePhone, BusinessPhone, location } = req.body;

        const newContact = new Contact({
            user: req.user.userId,
            BusinessName,
            BusinessRepresentative,
            RepresentativePhone,
            BusinessPhone,
            location,
            businessImage: req.files["businessImage"] ? req.files["businessImage"][0].path : null,
            representativePhoto: req.files["representativePhoto"] ? req.files["representativePhoto"][0].path : null,
            selfiePhoto: req.files["selfiePhoto"] ? req.files["selfiePhoto"][0].path : null
        });

        await newContact.save();
        res.status(201).json({ message: "Contact saved successfully", data: newContact.user });
    } catch (error) {
        res.status(500).json({ message: "Error saving contact", error: error.message });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.userId }).populate("user", "name email");
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts", error: error.message });
    }
};

const getTodaysContacts = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day
        const tomorrow = new Date();
        tomorrow.setHours(23, 59, 59, 999); // End of the day

        const contacts = await Contact.find({
            user: req.user.userId,
            createdAt: { $gte: today, $lte: tomorrow }
        }).populate("user", "name email");

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching today's contacts", error: error.message });
    }
};



const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request params

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userContact = await Contact.findById(id).populate("user", "name email");

        if (!userContact) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User details fetched successfully", data: userContact });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Error fetching user details", error: error.message });
    }
};



module.exports = { createContact, getContacts, getUserById, getTodaysContacts };
