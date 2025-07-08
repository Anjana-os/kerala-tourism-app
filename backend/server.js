const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

// ✅ Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/keralaapp')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ✅ MongoDB Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: "user" }
});
const User = mongoose.model('User', userSchema);

const placeSchema = new mongoose.Schema({
  district: String,
  name: String,
  address: String,
  image: String
});
const Place = mongoose.model('Place', placeSchema);

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "kerala-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// ✅ Registration Route
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const newUser = new User({ username: username.trim(), password: hashedPassword, role: role || 'user' });
    await newUser.save();

    res.json({ success: true, message: "Registration successful! Please login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error during registration." });
  }
});

// ✅ Login Route (Hardcoded admin + database users)
app.post("/login", async (req, res) => {
  let { username, password } = req.body;

  username = username.trim();
  password = password.trim();

  console.log("🔑 Received Login Request:", { username, password });

  try {
    if (username === "admin" && password === "admin123") {
      req.session.role = "admin";
      req.session.username = "admin";
      console.log("✅ Admin logged in successfully");
      return res.json({ success: true, role: "admin", message: "Welcome, Admin!" });
    }

    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.role = user.role;
      req.session.username = user.username;
      console.log("✅ User logged in successfully:", user.username);
      return res.json({
        success: true,
        role: user.role,
        message: `Welcome, ${user.role === "admin" ? "Admin" : "User"}!`
      });
    }

    console.log("❌ Invalid login attempt for username:", username);
    res.status(401).json({ success: false, message: "Invalid Username or Password" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error logging in." });
  }
});

// ✅ Session Check Route
app.get("/check-session", (req, res) => {
  if (req.session.username && req.session.role === "admin") {
    return res.json({ success: true, username: req.session.username, role: req.session.role });
  } else {
    return res.status(401).json({ success: false, message: "Unauthorized. Please login as admin." });
  }
});

// ✅ Add Place (Admin Only)
app.post("/add-place", async (req, res) => {
  if (!req.session.role || req.session.role !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized access" });
  }

  let { district, name, image, address } = req.body;

  district = district.trim().toLowerCase();
  name = name.trim();
  image = image.trim();
  address = address.trim();

  try {
    const newPlace = new Place({ district, name, address, image });
    await newPlace.save();

    res.json({ success: true, message: "Place added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error adding place." });
  }
});

// ✅ Get Places by District
app.get("/places/:district", async (req, res) => {
  const { district } = req.params;

  try {
    const places = await Place.find({ district: district.trim().toLowerCase() });
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching places." });
  }
});

// ✅ Get All Places (Admin Only)
app.get("/all-places", async (req, res) => {
  if (!req.session.role || req.session.role !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized access" });
  }

  try {
    const places = await Place.find({});
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching all places." });
  }
});

// ✅ Delete Place by ID (Admin Only)
app.delete("/delete-place/:id", async (req, res) => {
  if (!req.session.role || req.session.role !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized access" });
  }

  try {
    const deleted = await Place.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ success: true, message: "Place deleted successfully." });
    } else {
      res.status(404).json({ success: false, message: "Place not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting place." });
  }
});

// ✅ Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed." });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: "Logged out successfully." });
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
