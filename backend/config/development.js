
/**
 * Production config
 */

 module.exports = {

    // db uri to connect. 
    mongodb: {
        uri: `mongodb://localhost/dyte-backend`
    },

    backend: "http://localhost:8000",
    moleculer: "http://localhost:3000",
};