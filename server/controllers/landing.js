'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {
    const landingService = strapi.plugin('studio-profile').service('landingService');

    const getLandingPageData = async (ctx) => {
    console.log("getLandingPageData", "------------------------")
        try{
            ctx.body = await landingService.getLandingPageData(ctx);
        }
        catch(err){
            throw new Error("Error in getLandingPageData", err)
        }    
    }

    return {
        getLandingPageData
    }
};
