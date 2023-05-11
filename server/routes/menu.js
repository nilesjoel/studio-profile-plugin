'use strict';

/**
 *  router
 */

 module.exports = [
    {
      method: 'POST',
      path: '/menu/profile',
      handler: 'menuController.findMenuByProfile',
      config: {
        auth: false
      }
    },
  ];