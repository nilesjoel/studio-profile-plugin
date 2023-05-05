'use strict';

const _ = require('lodash');
const { DateTime, Duration } = require("luxon");


const chalk = require('chalk');


/**
 *  service
 */

module.exports = ({ strapi }) => {

    
    const index = async (ctx) => {
        console.log({ ctx })
        return "Welcome to You";
    }

    const getLandingPageData = async (context) => {

        try {
            console.log("GETTING LANDING PAGE DATA", "------------------------")
            return { "page": "landing", "data": "landing page data"}
            
        } catch (err) {
            console.error(err)
        }
    }




    return {
        getLandingPageData
    }
};
