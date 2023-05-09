'use strict';

/**
 *  router
 */

 module.exports = [
    {
      method: 'GET',
      path: '/tags',
      handler: 'tagSetController.tagSet',
      config: {
        auth: false
      }
    },
  ];