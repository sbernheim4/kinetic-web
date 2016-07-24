var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');
var stagingConfigPath = path.join(__dirname, './staging.js');

console.log("NODE PROCESS IS: ",process.env.NODE_ENV )

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else if (process.env.NODE_ENV === 'staging') {
    module.exports = require(productionConfigPath);
} else {
    module.exports = require(devConfigPath);
}