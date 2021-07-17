const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const secret = require('../config/secret')
const User = require('../models/userSchema')

const authenticate = (async (req, res, next) => {
    console.log(chalk.bold.cyanBright("Authenticating JWT Token..."))
    try {
        let data
        if (req.headers.token) {
            data = jwt.verify(req.headers.token, secret.token)
        } else if (req.body.token) {
            data = jwt.verify(req.body.token, secret.token)
        } else {
            throw new Error("JWT Authentication failed")
        }

        // check the token
        if (data.email) {
            const user = await User.findOne({ email: data.email })
            if (user) {
                console.log(user)
                req.body.user = user
                console.log(chalk.bold.green("JWT Authenticated"))
                next()
            }
        } else {
            throw new Error("JWT Authentication failed")
        }

    } catch (error) {
        console.log(chalk.bold.red("JWT Authentication Failed"))
        res.send({
            statusCode: 403,
            payload: {
                msg: "Could not Authenticate JWT Token, Contact Support",
                error: error
            },
        }).status(403)
    }

})



module.exports = {
    authenticate
}