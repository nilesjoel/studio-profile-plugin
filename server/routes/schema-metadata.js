'use strict';

/**
 *  router
 */
module.exports = [{
    method: 'GET',
    path: '/metadata/:schemaName',
    handler: 'schemaMetadataController.getMetadata',
    config: {
      auth: false,
      policies: [],
    },
  },{
    method: 'PUT',
    path: '/metadata/create/:schemaName',
    handler: 'schemaMetadataController.createMetadata',
    config: {
      auth: false,
      policies: [],
    },
  },
];


