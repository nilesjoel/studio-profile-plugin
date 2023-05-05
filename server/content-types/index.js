'use strict';


const profile = require('./profile')
const schemaMetadata = require('./schema-metadata')
const tag = require('./tag')
const menu = require('./menu')

module.exports = {
    profile,
    'schema-metadata' : schemaMetadata,
    tag,
    menu
};
