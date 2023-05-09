'use strict';

const profileController = require('./profile')
const landingController = require('./landing')
const schemaMetadataController = require('./schema-metadata')
const tagController = require('./tag')
const tagSetController = require('./tag-set')
const menuController = require('./menu')

module.exports = {
  profileController,
  landingController,
  schemaMetadataController,
  tagController,
  tagSetController,
  menuController
};
