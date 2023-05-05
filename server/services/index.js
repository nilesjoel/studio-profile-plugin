'use strict';

const profileService = require('./profile');
const landingService = require('./landing');
const schemaMetadataService = require('./schema-metadata');
const tagService = require('./tag');

module.exports = {
  profileService,
  landingService,
  schemaMetadataService,
  tagService
};
