import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import todoRoutes from './routes/todos.js';
import eventRoutes from './routes/events.js';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import User from './model/User.js';
import authenticateToken from './middleware/authMiddleware.js';

const app = express();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/todos', todoRoutes);
app.use('/events', eventRoutes);

mongoose.connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Generate Tokens
const generateAccessToken = (user) => {
    return jwt.sign(user, config.jwtSecret, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, config.jwtRefreshSecret, { expiresIn: "7d" });
};

// Register Route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
});

// Refresh Token Route
app.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, config.jwtRefreshSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: newAccessToken });
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
});

app.get("/verify", authenticateToken, (req, res) => {
    res.json({ loggedIn: true, user: req.user });
});

app.get("/profile", authenticateToken, (req, res) => {
    // res.json({ message: `Logged in as ${req.user.username}` });
    console.log(req.user);
    res.json({ username: req.user.username });
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});