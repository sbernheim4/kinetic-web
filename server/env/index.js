'use strict';

const path = require('path');
const devConfigPath = path.join(__dirname, './development.js');
const productionConfigPath = path.join(__dirname, './production.js');
const stagingConfigPath = path.join(__dirname, './staging.js');

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else if (process.env.NODE_ENV === 'staging') {
    module.exports = require(stagingConfigPath);
} else {
    module.exports = require(devConfigPath);
}