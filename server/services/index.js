'use strict';

const profileService = require('./profile')
const landingService = require('./landing')
const schemaMetadataService = require('./schema-metadata')
const tagService = require('./tag')
const tagSetService = require('./tag-set')
const menuService = require('./menu')

module.exports = {
  profileService,
  landingService,
  schemaMetadataService,
  tagService,
  tagSetService,
  menuService
};
