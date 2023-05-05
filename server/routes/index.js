
const profileRoutes = require('./profile')
const landingRoutes = require('./landing')
const schemaMetadataRoutes = require('./schema-metadata')
const tagRoutes = require('./tag')
const menuRoutes = require('./menu')

module.exports = [ 
  ...profileRoutes,
  ...landingRoutes,
  ...schemaMetadataRoutes,
  ...tagRoutes,
  ...menuRoutes
];