'use strict';


const profile = require('./profile');
const schemaMetadata = require('./schema-metadata')
const tag = require('./tag');

module.exports = {
    profile,
    'schema-metadata' : schemaMetadata,
    tag
};
