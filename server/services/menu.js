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
        console.log("findMenuByProfile: ------------------------------------------------", { token });
        try {
            //adding a default sort
            // params = params ?? {};
            // params["orderBy"] = "title";
            
            const studioProfile = await profileQuery.findMany({
                populate: ['menus', 'website'],
                where: {
                    user: { email: token.email },
                    website: { uid: token.site }
                },
                
            });

            console.log(`findMenuByProfile: [site:${token.site}] [email:${token.email}]------------------------------------------------menuEntities`);
            // console.log(menuEntities.menus.length)
            // console.log(JSON.stringify(menuEntities, null, 2));
            console.log({ "MENUS":studioProfile[0].menus })
            // if (menuEntities.length > 0) {
                return studioProfile[0].menus
            // } else {
            //     return menuEntities.data
            // }
            return {};
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
