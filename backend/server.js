import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import { ENV_VARS } from "./config/envConfig.js";
import {connectDB} from "./config/database.js";
import { protectedRoutes } from "./middleware/protectedRoutes.js";
import cors from "cors";
import dotenv from "dotenv"; 


const app = express();
const PORT = ENV_VARS.PORT;
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(cors({
	origin: ENV_VARS.CLIENT_URL,
  credentials: true,
	method: ["POST", "PUT", "DELETE", "GET"]
}));



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoutes, movieRoutes);
app.use("/api/v1/tv", protectedRoutes, tvRoutes);
app.use("/api/v1/search", protectedRoutes, searchRoutes);

if(ENV_VARS.NODE_ENV !== "production") {
  dotenv.config({
    path: "./.env"
  })
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

console.log(ENV_VARS.MONGO_URI);

connectDB()
// db connection

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Failed to start server: ${err.message}`);
});