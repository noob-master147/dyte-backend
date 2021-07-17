"use strict";

const DbMixin = require("../mixins/db.mixin");
const axios = require("axios")
const base64 = require('base-64');
const rax = require('retry-axios');
// const { v4 } = require('uuid');
module.exports = {
    name: "webhooks",
    // version: 1
    mixins: [DbMixin("webhooks")],
    settings: {},

    actions: {

        register: {
            rest: "GET /register/:targetUrl",

            params: {
                targetUrl: 'string'
            },

            async handler(ctx) {
                const checkIfExisting = await this.adapter.findOne({
                    targetUrl: ctx.params.targetUrl
                })
                // Check if the url is already present, then return the existing id
                if (checkIfExisting && checkIfExisting._id)
                    return { id: checkIfExisting._id, statusCode: 200 }

                // const id = v4();
                const doc = await this.adapter.insert({
                    targetUrl: ctx.params.targetUrl
                });

                return { id: doc._id, statusCode: 200 };
            }
        },

        update: {
            rest: "GET /update/:id/:newTargetUrl",

            params: {
                newTargetUrl: 'string',
                id: 'string'
            },
            async handler(ctx) {
                try {

                    const id = ctx.params.id
                    const webhookDoc = await this.adapter.findById(id)

                    if (webhookDoc) {
                        await this.adapter.updateById(
                            webhookDoc._id,
                            { targetUrl: ctx.params.newTargetUrl }
                        )
                        return { statusCode: 200 };

                    } else {
                        return { statusCode: 404 };
                    }
                } catch (error) {
                    return { statusCode: 500, error: error }
                }
            }
        },

        list: {
            rest: "GET /list",

            params: {
            },

            async handler(ctx) {
                try {
                    const allDocs = await this.adapter.find({})
                    return { webhooks: allDocs, statusCode: 200 }

                } catch (error) {
                    return { statusCode: 500, error: error }
                }
            }
        },

        trigger: {
            rest: "GET /trigger/:ipAddress",

            params: {
                ipAddress: 'string'
            },

            async handler(ctx) {
                try {
                    const allDocs = await this.adapter.find({})
                    let targetList = []
                    let retryList = []
                    let index = 0
                    let retryLimit = 5
                    const ip = base64.decode(ctx.params.ipAddress)

                    // iterate through all the documents
                    for (let doc of allDocs) {
                        index = index + 1
                        const payload = {
                            timestamp: Date.now(),
                            ip: ip
                        }

                        targetList.push(axios.post(doc.targetUrl, payload).catch((err) => {
                            retryList.push(err.config.url)
                            return null
                        }))

                        // triggr as soon as we hit 20 and then reset the list
                        if (index % 20 === 0) {
                            await axios.all(targetList)
                            targetList = []
                        }
                    }
                    // fire the remaining requests
                    await axios.all(targetList)

                    // console.log(retryList)
                    // Attept to retry 5 times for failed requests
                    if (retryList.length > 0) {
                        for (let url of retryList) {
                            for (let i = 0; i < retryLimit; i++) {
                                await axios.post(url, { timestamp: Date.now(), ip: ip })
                                    .then((res) => {
                                        console.log(`Retry Success: ${res.config.url}`)
                                        i = retryLimit
                                    })
                                    .catch((err) => null)
                            }
                        }
                    }

                    return { statusCode: 200, failed: retryList }
                } catch (error) {
                    return { statusCode: 500, error: error }
                }

            }
        },

        purge: {
            rest: "GET /purge/:id",

            params: {
                id: 'string'
            },

            async handler(ctx) {
                try {
                    const allDocs = await this.adapter.removeById(ctx.params.id)
                    return { webhooks: allDocs, statusCode: 200 }

                } catch (error) {
                    return { statusCode: 500, error: error }
                }
            }
        },

    },

    methods: {},
    async afterConnected() { }
};
