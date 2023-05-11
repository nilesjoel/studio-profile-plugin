'use strict';

/**
 *  service
 */


module.exports = ({ strapi }) => {

    const profileQuery = strapi.db.query('plugin::studio-profile.profile');


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
            // const menuEntities = await strapi.entityService.findOne('plugin::studio-profile.profile', {
            //     populate: ['menus'],
            //     filters: { user: { email: { $eq: token.email } } },
            // });
            const studioProfile = await profileQuery.findOne({
                where: { user: { email: token.email } },
                populate: ['menus'],
            });

            console.log("findMenuByProfile: ------------------------------------------------menuEntities");
            // console.log(menuEntities.menus.length)
            // console.log(JSON.stringify(menuEntities, null, 2));
            console.log({studioProfile})
            // if (menuEntities.length > 0) {
                return studioProfile.menus
            // } else {
                // return menuEntities.data
            // }
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
