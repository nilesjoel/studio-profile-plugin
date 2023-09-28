'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => {
    
    const schemaMetadataService = strapi.plugin('studio-profile').service('schemaMetadataService');
   
   
    const createMetadata = async (ctx) => {
        try {
            const { token, schema } = ctx.request.body;
            console.log("createMetadata", "------------------------", {token,schema})
            ctx.body = await schemaMetadataService.createMetadata(token, schema);
        }
        catch (err) {
            throw new Error("Error in createMetadata", err)
        }
    }

    const getMetadata = async (ctx) => {
        console.log("getMetadata", "------------------------", ctx.params)
        try {
            const { schemaName, profile } = ctx.params;
            ctx.body = await schemaMetadataService.getMetadata(profile, schemaName);
        }
        catch (err) {
            throw new Error("Error in getMetadata", err)
        }
    }

    const getMetadataTable = async (ctx) => {
        console.log("getMetadataTable", "------------------------", ctx.params)
        try {
            const { schemaName } = ctx.params;
            ctx.body = await schemaMetadataService.getMetadataTable(schemaName);
        }
        catch (err) {
            throw new Error("Error in getMetadataTable", err)
        }
    }

    const createManyMetadata = async (ctx) => {
        console.log("createManyMetadata", "------------------------", ctx.request.body)
        try {
            console.log(ctx.request.body)
            const { token, schema } = ctx.request.body;
            ctx.body = await schemaMetadataService.createManyMetadata(token, schema);
        }
        catch (err) {
            throw new Error("Error in createManyMetadata", err)
        }
    }

    const createBulkMetadata = async (ctx) => {
        console.log("createBulkMetadata", "------------------------", ctx.request.body)
        try {
            const { token, schema } = ctx.request.body; 
            // Create Metadata Fields for Schema
            ctx.body = await schemaMetadataService.createBulkMetadata(token, schema);
        }
        catch (err) {
            throw new Error("Error in createBulkMetadata", err)
        }
    }

    return {
        getMetadata,
        getMetadataTable,
        createMetadata,
        createManyMetadata,
        createBulkMetadata
    }
};
