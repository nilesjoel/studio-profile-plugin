'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {

    const profileService = strapi.plugin('studio-profile').service('profileService');

    const index = async (ctx) => {
        console.log(ctx.request.body)
        console.log("THIS PROFILE CONTROLLER", "------------------------");
        ctx.body = await profileService.getWelcomeMessage(ctx);
    }

    const getStudioProfile = async (ctx) => {
        console.log("GET STUDIO PROFILE CONTROLLER", "------------------------") //{ ctx })
        ctx.body = await profileService.getProfile(ctx);
    }

    const verifyStudioProfile = async (ctx) => {
        console.log(ctx.request.body)
        console.log("VERIFY STUDIO PROFILE CONTROLLER", "------------------------") //{ ctx })
        ctx.body = await profileService.verifyProfile(ctx)
    }
    const createStudioProfile = async (ctx) => {
        console.log("CREATE STUDIO PROFILE CONTROLLER", "------------------------") // { ctx })
        ctx.body = await profileService.createOrUpdate(ctx);
    }


    return {
        index,
        getStudioProfile,
        verifyStudioProfile,
        createStudioProfile
    }
};
