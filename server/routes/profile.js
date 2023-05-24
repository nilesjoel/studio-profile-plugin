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
  },
  {
    method: 'POST',
    path: '/profile/magic',
    handler: 'profileController.testMagicLink',
    config: {
      auth: false,
      policies: [],
    },
  }
];


