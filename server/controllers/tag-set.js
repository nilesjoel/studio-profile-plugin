'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {

    const tagSet = async (ctx) => {
        return ['tag1', 'tag2']
    }

    return {
        tagSet
    }
};
