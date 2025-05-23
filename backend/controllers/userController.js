const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Convert email to lowercase to prevent case-sensitivity issues
        const user = await User.findOne({ email: email.toLowerCase() });

        // Debugging logs
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password (User not found)" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password (Incorrect Password)" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Login error", error: error.message });
    }
};



const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
