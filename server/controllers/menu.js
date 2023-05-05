'use strict';

/**
 *  artwork controller
 */


module.exports = ({ strapi }) => {

    const menuService = strapi.plugin("studio-artist").service("menuService");

    const find = async (ctx) => {
        const { body } = ctx.request;
        try {
            ctx.body = await menuService.find(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }

    const findOne = async (ctx) => {
        try {
            ctx.body = await menuService.findOne(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }

    return { find, findOne }
};
