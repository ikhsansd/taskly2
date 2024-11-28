import express from 'express';
import "dotenv/config";
import { db } from "./config/db.js";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware global
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL, // Izinkan origin dari CLIENT_URL
        credentials: true, // Izinkan cookie dikirim
    })
);

// Middleware untuk logging
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Route utama
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Route untuk root
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, World!",
    });
});

// Handler untuk route yang tidak ditemukan
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});

// Middleware untuk error handling
app.use((err, req, res, next) => {
    console.error("[ERROR]", err.message || err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});
