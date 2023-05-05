'use strict';

const profileController = require('./profile');
const landingController = require('./landing');
const schemaMetadataController = require('./schema-metadata');
const tagController = require('./tag');

module.exports = {
  profileController,
  landingController,
  schemaMetadataController,
  tagController
};
