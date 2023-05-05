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
            "title":element.title,
            "slug":element.slug,
            "uid":element.uid
        });
        return menuEntities;   
    }


    return {
        find
    }
}
