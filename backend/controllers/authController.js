const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
    try {
        const {displayName, email, password} = req.body

        if (!(displayName && email && password)) {
            return res.status(400).send("All fields are required.")
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).send("Email already in use.")
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            displayName, email, password: encryptedPassword
        })

        const token = jwt.sign(
            {id: user._id, email},
            "shhhh", //process.env.jwtsecret
            {
                expiresIn: "24h"
            }
        );
        user.token = token
        user.password = undefined

        res.status(201).json(user)
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

const login =  async (req, res) => {
    try {
        const {email, password} = req.body

        if (!(email && password)) {
            return res.status(400).send("Email and pasword are required.")
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).send("Invalid credentials.")
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                    {id: user._id},
                    "shhhh",
                {
                    expiresIn: "24h"
                }
            );
            user.token = token;
            user.password = undefined;

                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.status(200).cookie("token", token, options).json({
                    success: true,
                    token,
                    user
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { register, login };