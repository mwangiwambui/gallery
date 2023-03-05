require('dotenv').config();

var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: process.env.MONGODB_URI_PROD,
    development: process.env.MONGODB_URI_DEV,
    test: process.env.MONGODB_URI_TEST,
}
module.exports = config;
