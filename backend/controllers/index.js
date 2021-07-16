const chalk = require('chalk')
const { SuccessResponse, ErrorResponse } = require('../helpers/status');
const axios = require('axios')
const config = require('../config')()
const secret = require('../config/secret')
const MOLECULER_ENDPOINT = config.moleculer
const base64 = require('base-64');


const ip = async (req) => {
    try {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        ip = base64.encode(ip)

        const response = await axios({
            url: `${MOLECULER_ENDPOINT}/api/webhooks/trigger/${ip}`,
            method: "GET"
        })

        if (response.data.statusCode !== 200) throw new Error('Something went wrong!')
        return SuccessResponse(200, 'Success in trigger', null)
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
        console.log(response.data)
        if (response.data.statusCode !== 200) throw new Error('Something went wrong!')
        return SuccessResponse(200, 'Success in trigger', null)
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
        console.log(chalk.green.bold("Success in update"))
        return SuccessResponse(200, 'Webhook Updated', null)
    }
    catch (err) {
        console.log(chalk.red.bold("Error in updating webhook!"))
        return ErrorResponse(500, 'Error in updating webhook! Contact Support: ', err)
    }
}



const del = async ({ email }) => {
    try {

        console.log(chalk.green.bold("user deleted"))
        // return SuccessResponse(200, 'User Data Deleted', user)
    }
    catch (err) {
        console.log(chalk.red.bold("Error in user/:email!"))
        return ErrorResponse(500, 'Error in user/:email! Contact Support: ', err)
    }
}


module.exports = {
    register,
    list,
    update,
    del,
    ip
}