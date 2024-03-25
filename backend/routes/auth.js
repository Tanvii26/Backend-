const { User } = require("../models/User");
const router = require("express").Router();
import jwt from "jsonwebtoken"

const generateRefreshToken = async (userID)=>{
    try{
        const user = User.findById(userID)
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave: false})
        return refreshToken
    }
    catch(e){
        res.status(400).json("Error generating refresh token")
    }
}

router.post("/register", async (req, res) => {
    const user = await new User(req.body)
    try {
        user.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }


})

router.post("/login", async (req, res) => {
    const email = req.body.email
    const pass = req.body.password
    try {
        const user = User.findOne({ "email": email })

        if (!user) res.status(401).json("No such user")

        if (pass === user.password) {

            const refreshToken = generateRefreshToken(user._id)
            
            res.status(200).cookie(refreshToken).json(user)
        }
        else res.status(400).json("Password Incorrect")

    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router