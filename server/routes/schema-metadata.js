'use strict';

/**
 *  router
 */
module.exports = [{
    method: 'GET',
    path: '/metadata/:schemaName',
    handler: 'schemaMetadataController.getMetadataTable',
    config: {
      auth: false,
      policies: [],
    },
  },{
    method: 'GET',
    path: '/metadata',
    handler: 'schemaMetadataController.getMetadata',
    config: {
      auth: false,
      policies: [],
    },
  },{
    method: 'PUT',
    path: '/metadata/create',
    handler: 'schemaMetadataController.createMetadata',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/metadata/create/many',
    handler: 'schemaMetadataController.createManyMetadata',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/metadata/create/bulk',
    handler: 'schemaMetadataController.createBulkMetadata',
    config: {
      auth: false,
      policies: [],
    },
  },
];


