'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {

    const tags = async (ctx) => {
        return ['tag1', 'tag2']
    }

    return {
        tags
    }
};
