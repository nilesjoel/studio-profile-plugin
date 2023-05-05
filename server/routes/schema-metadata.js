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
  },
];


