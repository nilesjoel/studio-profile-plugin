'use strict';

/**
 *  router
 */
module.exports = [
  {
    method: 'GET',
    path: '/index',
    handler: 'profileController.index',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'profileController.createStudioProfile',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/verify',
    handler: 'profileController.verifyStudioProfile',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/profile',
    handler: 'profileController.getStudioProfile',
    config: {
      auth: false,
      policies: [],
    },
  }
];


