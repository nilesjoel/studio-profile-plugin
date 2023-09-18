'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {
    const schemaMetadataService = strapi.plugin('studio-profile').service('schemaMetadataService');

    const getMetadata = async (ctx) => {


        console.log("getMetadata", "------------------------", ctx.params)
        try {
            const { schemaName } = ctx.params;
            ctx.body = await schemaMetadataService.getMetadata(schemaName);
        }
        catch (err) {
            throw new Error("Error in getLandingPageData", err)
        }
    }


    const createMetadata = async (ctx) => {


        console.log("createMetadata", "------------------------", ctx.params)
        try {
            const { fieldName, tableName } = ctx.params;
            ctx.body = await schemaMetadataService.createMetadata(fieldName, tableName);
        }
        catch (err) {
            throw new Error("Error in getLandingPageData", err)
        }
    }

    return {
        getMetadata,
        createMetadata
    }
};
