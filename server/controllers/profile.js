'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {

    const profileService = strapi.plugin('studio-profile').service('profileService');

    const index = async (ctx) => {
        // console.log(ctx.request.body)
        // console.log("THIS PROFILE CONTROLLER", "------------------------");
        ctx.body = await profileService.index(ctx);
    }

    const getStudioProfile = async (ctx) => {
        // Get Profile with Token.
        const { token } = ctx.request.body;
        console.log("GET STUDIO PROFILE CONTROLLER", "------------------------", { tokenEmail : token.email })
        try{
            ctx.body = await profileService.getProfile({token});
        }catch(err){
            ctx.badRequest("getStudioProfile:: ", err.message)
        }
    }

    /**
     * Verify Profile with Token.
     * @param {token} ctx 
     * @returns Studio Profile Data
     */
    const verifyStudioProfile = async (ctx) => {
        const { token } = ctx.request.body;
        // console.log("VERIFY STUDIO PROFILE CONTROLLER", "------------------------") //{ ctx })
        try{
            ctx.body = await profileService.verifyProfile({token})
        }catch(err){
            ctx.badRequest("verifyStudioProfile:: ", err.message)
        }
    }

    const testMagicLink = async (ctx) => {
        console.log("TEST MAGIC LINK CONTROLLER", "------------------------") // { ctx })
        ctx.body = await profileService.testMagicLink(ctx);
    }

    return {
        index,
        getStudioProfile,
        verifyStudioProfile,
        testMagicLink
    }
};
