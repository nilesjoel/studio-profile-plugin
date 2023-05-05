'use strict';

/**
 *  router
 */

 module.exports = [
    {
      method: 'GET',
      path: '/menu',
      handler: 'menuController.find',
      config: {
        auth: false
      }
    },
  ];