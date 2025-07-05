// Import packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Connect to MongoDB
console.log("🔥 Trying to connect to MongoDB...");
mongoose.connect('mongodb://127.0.0.1:27017/keralaapp', { })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: "user" }
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "kerala-secret",
  resave: false,
  saveUninitialized: true
}));

// User Registration Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('<h2 style="color:red; text-align:center;">❌ Username already exists</h2>');
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.send('<h2 style="color:green; text-align:center;">✅ Registration successful! <a href="/pages/login.html">Login Here</a></h2>');
  } catch (err) {
    res.send("❌ Error during registration.");
  }
});

// User Login Route (JSON Response)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      req.session.role = user.role;
      req.session.username = user.username;

      if (user.role === "admin") {
        return res.json({ success: true, redirect: "/pages/adminpage.html" });
      } else {
        return res.json({ success: true, redirect: "/pages/choose.html" });
      }
    } else {
      return res.json({ success: false, message: "❌ Invalid Username or Password" });
    }
  } catch (err) {
    return res.json({ success: false, message: "❌ Error logging in." });
  }
});

// API to get current user's role
app.get("/get-role", (req, res) => {
  res.json({ role: req.session.role || "user" });
});

// Admin route to add a tourist place
app.post("/add-place", (req, res) => {
  const { district, name, image, address } = req.body;

  if (req.session.role !== "admin") {
    return res.send("❌ Unauthorized access");
  }

  const filePath = path.join(__dirname, `public/components/${district}.html`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.send("❌ District page not found");

    const newCard = `
    <div class="place-card">
      <img src="${image}" alt="${name}">
      <div class="place-info">
        <h2>${name}</h2>
        <p><strong>Address:</strong> ${address}</p>
      </div>
    </div>
    `;

    const updatedData = data.replace("</main>", `${newCard}\n</main>`);

    fs.writeFile(filePath, updatedData, (err) => {
      if (err) return res.send("❌ Failed to add place");
      res.send(`
        <h2 style="text-align:center;color:green;">✅ Place added to ${district.charAt(0).toUpperCase() + district.slice(1)}</h2>
        <p style="text-align:center;"><a href="/components/${district}.html">View Page</a></p>
      `);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log("✅ Server is running at http://localhost:" + PORT);
});
