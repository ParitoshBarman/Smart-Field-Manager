const express = require("express");
const { createContact, getContacts, getUserById, getTodaysContacts } = require("../controllers/contactController");
const authMiddleware = require("../middlewares/authMiddleware");
// const multer = require("multer");
const upload = require("../middlewares/uploadMiddleware")

const router = express.Router();
// const upload = multer({ dest: "uploads/" });  // Save images in `uploads/`

router.post("/submit", authMiddleware, upload.fields([
    { name: "businessImage", maxCount: 1 },
    { name: "representativePhoto", maxCount: 1 },
    { name: "selfiePhoto", maxCount: 1 }
]), createContact);

router.get("/all", authMiddleware, getContacts);
router.get("/todaysvisit", authMiddleware, getTodaysContacts);
router.get("/:id", authMiddleware, getUserById);

module.exports = router;
