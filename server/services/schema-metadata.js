'use strict';

const _ = require('lodash');
const { DateTime, Duration } = require("luxon");


const chalk = require('chalk');


/**
 *  service
 */

const fieldTypes = ['string', 'number', 'email',
'multiple-select-dropdown','single-select-dropdown',
 'multi-check', 'boolean', 'code-area','date']




module.exports = ({ strapi }) => {

    // const metadataQuery = strapi.db.query('plugin::studio-profile.schema-metadata');
    // const index = async (ctx) => {
    //     console.log({ ctx })
    //     return "Welcome to You";
    // }
    // const te = {
    //     "schema": [
    //         {
    //             "id": 1,
    //             "fieldName": "email",
    //             "editable": true,
    //             "fieldLabel": "Enter your email address.",
    //             "required": true,
    //             "tableName": "signup",
    //             "fieldType": "email",
    //             "validators": null,
    //             "studioTags": [
    //                 {
    //                     "id": 1, "createdAt": "2022-11-26T17:21:50.977Z", "updatedAt": "2022-11-26T17:21:50.977Z", "title": "StudioCollection", "context": "artwork", "slug": "studio-collection"
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 2, "fieldName": "name", "editable": true, "fieldLabel": "Enter your name.", "required": true, "tableName": "signup", "fieldType": "text", "validators": null,
    //             "studioTags": [
    //                 { "id": 1, "createdAt": "2022-11-26T17:21:50.977Z", "updatedAt": "2022-11-26T17:21:50.977Z", "title": "StudioCollection", "context": "artwork", "slug": "studio-collection" }
    //             ]
    //         }
    //     ]
    // }


    const createMetadata = async (token, schema) => {
            
            const { profile } = token;
            const { uid, id } = profile;
            // console.log({ schema }, null, 2)
            const schemaData = schema.map((metadata) => {
                return {
                    editable: true,
                    required: false,
                    fieldName: metadata.fieldName,
                    tableName: metadata.tableName,
                    validators: null,
                    options: null,
                    fieldType: metadata.fieldType,
                    fieldLabel: metadata.fieldLabel,
                    gridSize: 12,
                    studioTags: [],
                    profile: { uid, id }
                }
            });
            // console.log({ schemaData }, null, 2);
            try {
                const entry = await strapi.db.query('plugin::studio-profile.schema-metadata').createMany({
                    data: schemaData
                });
                const result = entry;
                console.log("SCHEMA METADATA SERVICE", "------------------------", JSON.stringify({ result }, null, 2));
                // { token, schema, result }
                return { result }
            }
            catch (err) {
                console.log("SCHEMA METADATA SERVICE", "------------------------", { err })
            }
    }

    const getMetadataTable = async (schemaName) => {

        try {


            const metadataFields = await metadataQuery.findMany({
                select: [
                    'id',
                    'fieldName',
                    'editable',
                    'fieldLabel',
                    'required',
                    'tableName',
                    'fieldType',
                    'gridSize',
                    'validators',
                    'options'
                ],
                where: { tableName: schemaName },
                populate: { studioTags: true },
            });
            console.log("GETTING METADATA TABLE : " + schemaName, "------------------------")
            return { schema: metadataFields }

        } catch (err) {
            console.error("METADATA TABLE", err)
        }
    }

    const getMetadata = async (profile, schemaName) => {

        try {

            const metadataFields = await metadataQuery.findMany({
                select: [
                    'id',
                    'fieldName',
                    'editable',
                    'fieldLabel',
                    'required',
                    'tableName',
                    'fieldType',
                    'gridSize',
                    'validators',
                    'options'
                ],
                where: { profile: { uid: profile.uid } },
                populate: { studioTags: true },
            });
            console.log("GETTING METADATA : " + schemaName, "------------------------")
            return { schema: metadataFields }

        } catch (err) {
            console.error("METADATA", err)
        }
    }


    const createManyMetadata = async (token, schema) => {
        const { profile } = token;
        const { uid, id } = profile;
        // console.log({ schema }, null, 2)
        const schemaData = schema.map((metadata) => {
            return {
                editable: true,
                required: false,
                fieldName: metadata.fieldName,
                tableName: metadata.tableName,
                validators: null,
                options: null,
                fieldType: metadata.fieldType,
                fieldLabel: metadata.fieldLabel,
                gridSize: 12,
                studioTags: [],
                profile: { uid, id }
            }
        });
        // console.log({ schemaData }, null, 2);
        try {
            const entry = await strapi.db.query('plugin::studio-profile.schema-metadata').createMany({
                data: schemaData
            });
            const result = entry;
            console.log("SCHEMA METADATA SERVICE", "------------------------", JSON.stringify({ result }, null, 2));
            // { token, schema, result }
            return { result }
        }
        catch (err) {
            console.log("SCHEMA METADATA SERVICE", "------------------------", { err })
        }

    }




    // Bulk Metadata
    // An array of objects that define the schema for each table.
    // Each object in the array represents a table.
    // Each table has a tableName, fields, and relationships.
    // Each field has a name, type, editable, and required.
    // Each relationship has an entity, editable, and required.
    // The tableName and entity properties are used to create
    // the relationship between the tables.
    // The editable and required properties are used to determine
    // if the field or relationship is editable or required.
    // The type property is used to determine if the relationship
    // is a select or multi-select relationship.
    // The fields and relationships are ordered based on the order
    // they exist in the original schemaMetadata object.
    const schemaMetadata = [
        {
            tableName: "website",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "siteBrandName", type: "string", editable: true, required: true },
                { name: "name", type: "string", editable: true, required: true },
                { name: "context", type: "string", editable: true, required: false },
            ],
            relationships: [
                // Expectation : Add or Remove Menus from Website
                // { entity: "menus", editable: true, required: false },
                // Expectation : Add or Remove Webimages from Website
                { entity: "webimages", editable: true, required: false },
                // Expectation : Add or Remove Weblinks from Website
                { entity: "weblinks", editable: true, required: false },
                // Expectation : Add or Remove Websocials from Website
                { entity: "websocials", editable: true, required: false },
                // Expectation : Add or Remove Pages from Website
                { entity: "pages", editable: true, required: false },
                // Expectation : Add or Remove Webads from Website
                { entity: "webads", editable: true, required: false },
                // Expectation : Add or Remove Webemails from Website
                { entity: "webemails", editable: true, required: false }
            ],
        },
        {
            tableName: "webad",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "title", type: "string", editable: true, required: true },
                { name: "description", type: "string", editable: true, required: false },
                { name: "slug", type: "string", editable: true, required: true },
                { name: "cta", type: "string", editable: true, required: false },
            ],
            relationships: [{
                // Website relationship exists on the other side of the relationship.
                // Website will be passed as a parameter when creating, updating, or deleting.
                entity: "website",
                editable: false,
                required: true
            }],
        },
        {
            tableName: "webpage",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "title", type: "string", editable: true, required: true },
                { name: "description", type: "string", editable: true, required: false },
                { name: "name", type: "string", editable: true, required: true },
                { name: "cta", type: "string", editable: true, required: false },
            ],
            relationships: [
                // Relationship exists on the other side of the relationship.
                // Website will be passed as a parameter when creating, updating, or deleting.
                { entity: "website", editable: false, required: true },
                // Expectation : Add or Remove Weblinks from Webpage
                { entity: "weblink", type: "select", editable: true, required: false },
                // Expectation : Add or Remove Webads from Webpage
                { entity: "webads", type: "select", editable: true, required: false },
                // Expectation : Add or Remove Webimages from Webpage
                { entity: "webimages", type: "select", editable: true, required: false },
            ],
        },
        {
            tableName: "webemail",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "name", type: "string", editable: true, required: true },
                { name: "template", type: "string", editable: true, required: true },
            ],
            relationships: [
                // Relationship exists on the other side of the relationship.
                // Website will be passed as a parameter when creating, updating, or deleting.
                { entity: "website", editable: false, required: true },
            ],
        },
        {
            tableName: "webimage",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "title", type: "string", editable: true, required: true },
                { name: "description", type: "string", editable: true, required: false },
                { name: "slug", type: "string", editable: true, required: true },
                // { name: "media", type: "images", editable: true, required: true },
                // { name: "cover", type: "image", editable: true, required: false },
            ],
            relationships: [
                // Relationship exists on the other side of the relationship.
                // Website will be passed as a parameter when creating, updating, or deleting.
                { entity: "website", editable: false, required: true },
            ],
        },
        {
            tableName: "weblink",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "title", type: "string", editable: true, required: true },
                { name: "segment", type: "enumeration", editable: true, required: false },
                { name: "slug", type: "string", editable: true, required: true },
            ],
            relationships: [
                // Relationship exists on the other side of the relationship.
                // Website will be passed as a parameter when creating, updating, or deleting.
                { entity: "website", editable: false, required: true },
                // Relationship exists on the other side of the relationship.
                // Webpage will be passed as a parameter when creating, updating, or deleting.
                { entity: "webpage", editable: false, required: true },
            ],
        },
        {
            tableName: "websocial",
            fields: [
                { name: "uid", type: "string", editable: false, required: true },
                { name: "handle", type: "string", editable: true, required: true },
                { name: "provider", type: "enumeration", editable: true, required: true },
                { name: "slug", type: "string", editable: true, required: true },
            ],
            relationships: [
                // Relationship exists on the other side of the relationship. 
                // Website will be passed as a parameter when creating, updating, or deleting.
                { entity: "website", editable: false, required: true },
            ],
        },
    ];
    // Build the schema metadata from the schemaMetadata object defined above.
    const buildSchemaMetadata = async (token, schema) => {

        const { uid, id } = token.profile;
        // console.log("buildSchemaMetadata", {uid, id})
        // TODO:: UPDATE with schema paramater from request.
        const schemaFieldsAndRelationships = [
            ...schemaMetadata.map(({ tableName, fields }) =>
                fields.map((field) => ({
                    uid: tableName + "-" + field.name,
                    type: "field",
                    editable: field.editable,
                    required: field.required,
                    tableName,
                    fieldType: field.type,
                    fieldName: field.name,
                    fieldLabel: `Enter ${field.name !== 'uid' ? field.name.charAt(0).toUpperCase() + field.name.slice(1) : field.name}.`,
                    validators: field.validators || null,
                    options: field.options || null,
                    gridSize: field.gridSize || 12,
                    studioTags: [],
                    profile: { uid, id }
                    // profile: { "uid": "studio_gallery_nilesjoel_gmail_com", "id": 40 }
                }))
            ),
            ...schemaMetadata.map(({ tableName, relationships }) =>
                relationships.map((relationship) => ({
                    uid: tableName + "-" + relationship.entity,
                    type: "relationship",
                    tableName,
                    fieldType: 'relationship',
                    fieldName: relationship.entity,
                    fieldLabel: `Select ${relationship.entity !== 'uid' ? relationship.entity.charAt(0).toUpperCase() + relationship.entity.slice(1) : relationship.entity}.`,
                    // profile: { uid, id: 40 },
                    profile: { uid, id },
                    ...relationship,
                }))
            ),
        ];

        // 
        const allSchemaFieldsAndRelationships = schemaFieldsAndRelationships.reduce(
            (accumulator, currentValue) => [...accumulator, ...currentValue],
            []
        );

        // Order the fields in the array based on the order they exist in the original schemaMetadata object.
        const orderedSchemaFieldsAndRelationships = allSchemaFieldsAndRelationships.sort(
            (a, b) => {
                const aIndex = schemaMetadata.findIndex(
                    ({ tableName }) => tableName === a.tableName
                );
                const bIndex = schemaMetadata.findIndex(
                    ({ tableName }) => tableName === b.tableName
                );

                if (aIndex < bIndex) {
                    return -1;
                } else if (aIndex > bIndex) {
                    return 1;
                } else {
                    if (a.type === "field" && b.type === "field") {
                        return 0;
                    } else if (a.type === "field" && b.type === "relationship") {
                        return -1;
                    } else if (a.type === "relationship" && b.type === "field") {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        )


        // Create a counter for each unique tableName.
        const tableNameToOrderCounter = new Map();
        // Update the `order` props of the elements in the array after sorting, restarting the counter for each unique tableName.
        orderedSchemaFieldsAndRelationships.forEach((element, index) => {
            const tableName = element.tableName;
            const orderCounter = tableNameToOrderCounter.get(tableName) ?? 0;
            tableNameToOrderCounter.set(tableName, orderCounter + 1);
            // Increment
            element.fieldOrder = orderCounter + 1;
        });


        // Create a counter for each unique tableName.
        const tableNameToRelatedOrderCounter = new Map();
        // Update the `relatedOrder` props of the relationships, restarting the counter for each unique tableName.
        orderedSchemaFieldsAndRelationships
            .filter((element) => element.type === "relationship")
            .forEach((element, index) => {
                const tableName = element.tableName;
                const relatedOrderCounter = tableNameToRelatedOrderCounter.get(tableName) ?? 0;
                tableNameToRelatedOrderCounter.set(tableName, relatedOrderCounter + 1);
                // Increment
                element.relatedOrder = relatedOrderCounter + 1;
            });

        return orderedSchemaFieldsAndRelationships;
    };
    // Create the schema metadata from the schemaMetadata object defined above.
    const createBulkMetadata = async (token, schema) => {
        // const { profile } = token;
        // const { uid, id } = profile;

        // This uses the schemaMetadata object defined above.
        // TODO: UPDATE with schema paramater from request 
        //       or if none is passed, 
        //       refactor schemaMetadata to exist in a separate file.
        const schemaMetadataFields = await buildSchemaMetadata(token, schemaMetadata);

        // console.log({ "numberOf": schemaMetadataFields.length, schemaMetadataFields }, "-----------------------")


        // ----------------------------------------------------
        // TODO: UNCOMMENT THIS CODE TO CREATE SCHEMA METADATA
        // ----------------------------------------------------

        try {





            // const entry = await strapi.db.query('plugin::studio-profile.schema-metadata').createMany({
            //     data: schemaMetadataFields
            // });
            // const result = entry;



            let schemaMetadataResult = [];

            for (let i = 0; i < schemaMetadataFields.length; i++) {
                // const entry = await strapi.db.query('plugin::studio-profile.schema-metadata').create({
                const entry = await strapi.entityService.create('plugin::studio-profile.schema-metadata', {
                    data: schemaMetadataFields[i]
                });
                const result = entry;
                schemaMetadataResult[schemaMetadataResult.length] = result;
                console.log(i, { result })

            }

            console.log("SCHEMA METADATA SERVICE", "------------------------",
                JSON.stringify({ "resultingSchemaMetadataFields": schemaMetadataResult.length, schemaMetadataResult }, null, 2));


            return { schemaMetadataResult }
        }
        catch (err) {
            console.log("SCHEMA METADATA SERVICE", "------------------------", { err })
        }

        return schemaMetadataFields;
    }








    return {
        getMetadata,
        getMetadataTable,
        createMetadata,
        createManyMetadata,
        createBulkMetadata
    }


};



 // const createManyMetadata_Proto = async (token, schema) => {

//     try {
//         const entry = await strapi.db.query('plugin::studio-profile.schema-metadata').createMany({
//             data: [{
//                 editable: true,
//                 required: false,
//                 fieldName: "name24",
//                 tableName: "webpage",
//                 validators: null,
//                 options: null,
//                 fieldType: "text",
//                 fieldLabel: "Enter your own.",
//                 gridSize: 12,
//                 studioTags: [],
//                 profile: {
//                     uid: "studio_gallery_nilesjoel_gmail_com"
//                 }
//             }, {
//                 editable: true,
//                 required: false,
//                 fieldName: "cta3",
//                 tableName: "webpage",
//                 validators: null,
//                 options: null,
//                 fieldType: "text",
//                 fieldLabel: "Cow Town Art 3",
//                 gridSize: 12,
//                 studioTags: [],
//                 profile: {
//                     uid: "studio_gallery_nilesjoel_gmail_com", id: 40
//                 }
//             }]
//         });
//         const result = entry;
//         console.log("SCHEMA METADATA SERVICE", "------------------------",
//             JSON.stringify({ result }, null, 2));
//         { token, schema, result }

//         return { result }
//     } catch (err) {
//         console.log("SCHEMA METADATA SERVICE", "------------------------", { err })
//     }
// }



// const createMetadata = async (token, schema) => {

//     const { profile } = token;
//     console.log({token})
//     try {


//         // console.log({metadata})
//         const entry = await strapi.entityService.create('plugin::studio-profile.schema-metadata', {
//             data : schema
//         });

//         const result = entry;

//         // const bMetadata = await createBulkMetadata(schema);

//         console.log("SCHEMA METADATA SERVICE", "------------------------",
//             JSON.stringify({ result, schema }, null, 2));
//         // { token, schema, metadata }

//         return { result }
//     } catch (err) {
//         console.log("SCHEMA METADATA SERVICE", "------------------------", { err })

//         throw new Error(err);
//     }
// }

