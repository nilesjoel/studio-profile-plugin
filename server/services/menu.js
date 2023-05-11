'use strict';

/**
 *  service
 */


module.exports = ({ strapi }) => {

    const find = async () => {
        const entity = await strapi.entityService.findMany('plugin::studio-profile.menu', {
            populate: '*'
        })
        const menuEntities = [];
        entity.forEach(element => menuEntities[menuEntities.length] = {
            "title": element.title,
            "slug": element.slug,
            "uid": element.uid
        });
        return menuEntities;
    }

    const findMenuByProfile = async (ctx) => {
        const { token } = ctx.request.body;
        console.log("findMenuByProfile: ------------------------------------------------", JSON.stringify(token));
        try {
            //adding a default sort
            // params = params ?? {};
            // params["orderBy"] = "title";
            const menuEntities = await strapi.entityService.findMany('plugin::studio-profile.menu', {
                populate: ['profile'],
                filters: { profile: { user: { email: { $eq: token.email } } } },
                sort: { order: 'asc' },
            });

            console.log("findMenuByProfile: ------------------------------------------------menuEntities");
            console.log(menuEntities.length)
            console.log(JSON.stringify(menuEntities, null, 2));
            
            if (menuEntities.length > 0) {
                return menuEntities
            } else {
                return menuEntities.data
            }
        }
        catch (exp) {
            throw new Error(`Social Profile Menu Service: findMenuByProfile: ${exp.message}`);
        }
    }


    return {
        find,
        findMenuByProfile
    }
}
