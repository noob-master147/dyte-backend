
/**
 * Production config
 */

 module.exports = {

    // db uri to connect. 
    mongodb: {
        uri: `mongodb://${process.env.MONGO_HOST}/dyte-backend`
    },

    backend: "backend",
    moleculer: `http://${process.env.API_HOST}:3000`,
};