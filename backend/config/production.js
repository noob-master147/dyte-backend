
/**
 * Production config
 */

 module.exports = {

    // db uri to connect. Name of the database is notifications, please change it to your liking
    mongodb: {
        uri: `mongodb://${process.env.MONGO_HOST}/hic-backend`
    },

    backend: "http://localhost:8000",
    frontend: "http://localhost:3000",
};