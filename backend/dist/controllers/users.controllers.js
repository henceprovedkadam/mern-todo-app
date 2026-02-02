import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // CHECK IF EMAIL IS UNIQUE
        if (await userModel.findOne({ email })) {
            return res.status(400).json({ msg: "User already exist" });
        }
        else {
            // DISPLAY INCOMING DATA
            console.log("SIGN-UP: ", name, email, password);
            // HASHING PASSWORD
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({
                name,
                email,
                password: hashedPassword,
            });
            user.save();
            res.status(200).json({ msg: "Sign-up Successful", user: user });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error: ", error);
            res.status(500).json({ msg: "Server Error", error: error.message });
        }
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("LOGIN: ", email, password);
        const user = await userModel.findOne({ email });
        // CHECK IF EMAIL EXISTS
        if (user) {
            //  CHECK THE PASSWORD IS CORRECT OR NOT
            if (await bcrypt.compare(password, user.password)) {
                // GETTING THE USER ID
                const userId = user.id;
                const userName = user.name;
                const privateKey = process.env.PRIVATE_KEY;
                // GENERERATING TOKEN
                const token = jwt.sign({ userId, userName }, privateKey, {
                    expiresIn: "30d",
                });
                // COOKIE OPTIONS
                const cookieOptions = {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                    secure: false,
                    sameSite: "Lax",
                };
                return res
                    .status(200)
                    .cookie("token", token, cookieOptions)
                    .json({ msg: "Login successful", token: token });
            }
            else {
                return res.status(400).json({ msg: "Incorrect Password" });
            }
        }
        else {
            return res.status(400).json({ msg: "Email does not exist." });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error: ", error);
            res.status(500).json({ msg: "Server Error", error: error.message });
        }
    }
};
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, // Use true in production with HTTPS
        sameSite: "none", // Required for cross-origin cookies
    });
    return res.status(200).json({ msg: "Logout successful", success: true });
};
