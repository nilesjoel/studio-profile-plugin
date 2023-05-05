'use strict';

/**
 *  router
 */
module.exports = [{
    method: 'GET',
    path: '/landing',
    handler: 'landingController.getLandingPageData',
    config: {
      auth: false,
      policies: [],
    },
  },
];


