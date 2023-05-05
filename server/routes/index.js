
const profileRoutes = require('./profile');
const landingRoutes = require('./landing')
const schemaMetadataRoutes = require('./schema-metadata')
const tagRoutes = require('./tag');

module.exports = [ 
  ...profileRoutes,
  ...landingRoutes,
  ...schemaMetadataRoutes,
  ...tagRoutes
];