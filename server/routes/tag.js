'use strict';

/**
 *  router
 */

 module.exports = [
    {
      method: 'GET',
      path: '/tags',
      handler: 'tagController.tags',
      config: {
        auth: false
      }
    },
  ];