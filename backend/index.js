import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { connectDB } from "./config/database.js";
import { protectedRoutes } from "./middleware/protectedRoutes.js";
import { ENV_VARS } from "./config/envConfig.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(
  {
      origin: ["https://moviex-ui.vercel.app/", "http://localhost:5173"],
      methods: ["POST", "GET"],
      credentials: true
  }
));

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoutes, movieRoutes);
app.use("/api/v1/tv", protectedRoutes, tvRoutes);
app.use("/api/v1/search", protectedRoutes, searchRoutes);

// Database connection

// Start server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error(`Failed to start server: ${err.message}`);
});
