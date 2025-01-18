import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envConfig.js";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "1h" });

	res.cookie("jwt-netflix", token, {
		httpOnly: true, 
		sameSite: "strict", 
		secure: ENV_VARS.NODE_ENV !== "development",
	});

	return token;
};