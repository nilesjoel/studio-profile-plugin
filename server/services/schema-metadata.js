'use strict';

const _ = require('lodash');
const { DateTime, Duration } = require("luxon");


const chalk = require('chalk');


/**
 *  service
 */

module.exports = ({ strapi }) => {

    const metadataQuery = strapi.db.query('plugin::studio-profile.schema-metadata');
    const index = async (ctx) => {
        console.log({ ctx })
        return "Welcome to You";
    }
    const te = {
        "schema": [
            {
                "id": 1,
                "fieldName": "email",
                "editable": true,
                "fieldLabel": "Enter your email address.",
                "required": true,
                "tableName": "signup",
                "fieldType": "email",
                "validators": null,
                "studioTags": [
                    {
                        "id": 1, "createdAt": "2022-11-26T17:21:50.977Z", "updatedAt": "2022-11-26T17:21:50.977Z", "title": "StudioCollection", "context": "artwork", "slug": "studio-collection"
                    }
                ]
            },
            {
                "id": 2, "fieldName": "name", "editable": true, "fieldLabel": "Enter your name.", "required": true, "tableName": "signup", "fieldType": "text", "validators": null,
                "studioTags": [
                    { "id": 1, "createdAt": "2022-11-26T17:21:50.977Z", "updatedAt": "2022-11-26T17:21:50.977Z", "title": "StudioCollection", "context": "artwork", "slug": "studio-collection" }
                ]
            }
        ]
    }
    const getMetadata = async (schemaName) => {

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
            console.log("GETTING METADATA : " + schemaName, "------------------------")
            return { schema: metadataFields }

        } catch (err) {
            console.error(err)
        }
    }




    return {
        getMetadata
    }
};
