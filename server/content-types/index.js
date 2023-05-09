'use strict';


const profile = require('./profile')
const schemaMetadata = require('./schema-metadata')
const tag = require('./tag')
const tagSet = require('./tag-set')
const menu = require('./menu')

module.exports = {
    profile,
    'schema-metadata' : schemaMetadata,
    tag,
    'tag-set': tagSet,
    menu
};
