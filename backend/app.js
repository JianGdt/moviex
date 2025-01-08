import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { connectDB } from "./config/database.js";
import { protectedRoutes } from "./middleware/protectedRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "https://moviex-ui.vercel.app/"], // frontend URI (ReactJS)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoutes, movieRoutes);
app.use("/api/v1/tv", protectedRoutes, tvRoutes);
app.use("/api/v1/search", protectedRoutes, searchRoutes);

app.get("/", (req, res) => {
  res.status(201).json({message: "Connected to Backend!"});
});

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: "Invalid JSON" });
  }
  next();
});

// Database connection
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error(`Failed to start server: ${err.message}`);
});
