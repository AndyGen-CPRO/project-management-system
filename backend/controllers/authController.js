const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//register 
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
            process.env.JWT_SECRET,
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
//login
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



//so I'm not sure about this one 
//it get's the username of all the users so that I can use it for project creation, I'm unsure if that poor practise or not the api does not expose the password 
const getUsers = async (req,res) => {
    try {
        const user = await User.find({},{ id_: 1,displayName : 1})
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message : 'Error retriving user'})
    }


}
module.exports = { register, login,getUsers };