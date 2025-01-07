import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/envConfig.js";
import { connectDB } from "./config/database.js";
import { protectedRoutes } from "./middleware/protectedRoutes.js";
import cors from "cors";

const app = express();

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(cors({
	origin: ["http://localhost:5173", "https://moviex-apis.onrender.com/"],
    credentials: true,
	methods: ["POST", "PUT", "DELETE", "OPTIONS", "GET"]
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoutes, movieRoutes);
app.use("/api/v1/tv", protectedRoutes, tvRoutes);
app.use("/api/v1/search", protectedRoutes, searchRoutes);

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});