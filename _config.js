const dotenv = require("dotenv");

dotenv.config();

var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: process.env.MONGODB_URI_PROD,
    development: process.env.MONGODB_URI_DEV,
    test: 'mongodb+srv://test:testCredentials@cluster0.sl8dl.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
