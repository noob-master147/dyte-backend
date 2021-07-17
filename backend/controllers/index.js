const chalk = require('chalk')
const { SuccessResponse, ErrorResponse } = require('../helpers/status');
const axios = require('axios')
const config = require('../config')()
const secret = require('../config/secret')
const MOLECULER_ENDPOINT = config.moleculer
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')


const signjwt = async ({ email }) => {
    try {
        const token = jwt.sign({ email }, process.env.SECRET_KEY || secret.token);
        const user = new User({ email })
        await user.save()
        return SuccessResponse(200, `Signed a new JWT for ${email}`, { token })
    } catch (err) {
        console.log(chalk.red.bold("Internal Server Error!"))
        return ErrorResponse(500, 'Internal Server Error! Contact Support: ', err)
    }
}

const ip = async (req) => {
    try {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        ip = base64.encode(ip)

        const response = await axios({
            url: `${MOLECULER_ENDPOINT}/api/webhooks/trigger/${ip}`,
            method: "GET"
        })

        if (response.data.statusCode !== 200) throw new Error('Something went wrong!')
        return SuccessResponse(200, 'Success in trigger', { failed: response.data.failed })
    }
    catch (err) {
        console.log(chalk.red.bold("Internal Server Error!"))
        return ErrorResponse(500, 'Internal Server Error! Contact Support: ', err)
    }
}



const register = async (body) => {
    try {
        let url = encodeURIComponent(body.url)
        const response = await axios({
            url: `${MOLECULER_ENDPOINT}/api/webhooks/register/${url}`,
            method: "GET"
        })
        if (response.data.statusCode !== 200) throw new Error('Something went wrong!')
        console.log(chalk.green.bold("Webhook Registered"))
        return SuccessResponse(200, 'Success in registering webhook', { id: response.data.id })
    }
    catch (err) {
        console.log(chalk.red.bold("Error in register!"))
        return ErrorResponse(500, 'Error in register! Contact Support: ', err)
    }
}


const list = async () => {
    try {
        const response = await axios({
            url: `${MOLECULER_ENDPOINT}/api/webhooks/list/`,
            method: "GET"
        })
        const webhooks = response.data.webhooks
        let webhookList = []

        webhooks.forEach(hook => {
            webhookList.push(hook.targetUrl)
        });

        if (response.data.statusCode !== 200) throw new Error('Something went wrong!')
        console.log(chalk.green.bold("All Webhooks Fetched"))
        return SuccessResponse(200, 'Fetched all webhooks', webhookList)
    }
    catch (err) {
        console.log(chalk.red.bold("Error in fetching webhooks!"))
        return ErrorResponse(500, 'Error in fetching webhooks! Contact Support: ', err)
    }
}


const update = async ({ id, url }) => {
    try {
        url = encodeURIComponent(url)
        const response = await axios({
            url: `${MOLECULER_ENDPOINT}/api/webhooks/update/${id}/${url}`,
            method: "GET"
        })
        console.log(response.data)
        if (response.data.statusCode === 404) {
            return SuccessResponse(404, `Webhook with ${id} does not exists.`, null)
        } if (response.data.statusCode !== 200) {
            throw new Error('Something went wrong!')
        }

        console.log(chalk.green.bold("Webhook Updated"))
        return SuccessResponse(200, 'Webhook Updated', null)
    }
    catch (err) {
        console.log(chalk.red.bold("Error in updating webhook!"))
        return ErrorResponse(500, 'Error in updating webhook! Contact Support: ', err)
    }
}



const del = async ({ id }) => {
    try {
        const response = await axios({
            url: `${MOLECULER_ENDPOINT}/api/webhooks/purge/${id}`,
            method: "GET"
        })
        if (response.data.statusCode === 404) {
            return SuccessResponse(404, `Webhook with ${id} does not exists.`, null)
        } if (response.data.statusCode !== 200) {
            throw new Error('Something went wrong!')
        }
        console.log(chalk.green.bold("Webhook deleted"))
        return SuccessResponse(200, 'Webhook deleted', null)
    }
    catch (err) {
        console.log(chalk.red.bold("Error in deleting webhook"))
        return ErrorResponse(500, 'Error in deleting webhook Contact Support: ', err)
    }
}


module.exports = {
    signjwt,
    register,
    list,
    update,
    del,
    ip
}