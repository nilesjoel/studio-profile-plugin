'use strict';

const _ = require('lodash');
const { DateTime, Duration } = require("luxon");


const chalk = require('chalk');


/**
 *  service
 */

module.exports = ({ strapi }) => {

    const profileQuery = strapi.db.query('plugin::studio-profile.profile');
    const userQuery = strapi.db.query('plugin::users-permissions.user');

    const error = chalk.bold.red;
    const warning = chalk.keyword('orange');

    const getWelcomeMessage = async (ctx) => {
        const user = await userQuery.findOne({
            select: '*',
            where: { email: 'me@nileswhite.com' },
            populate: { category: true },
        });

        console.log({ user })

        warning("Welcome to You");

        return user;
    }
    const index = async (ctx) => {
        console.log({ ctx })
        return "Welcome to You";
    }

    const getUserProfile = async (userEmail) => {

        try {

            const studioProfile = await profileQuery.findOne({
                where: { user: { email: token.email } }
            });
            const profileData = await studioProfile;

        } catch (err) {
            console.error(err)
        }
    }



    const getProfile = async (ctx) => {

        console.log("GETSTUDIOPROFILE-------------")
        // console.log(ctx.request.body)

        const token = ctx.request.body;
        const { jwt } = token;
        const verifiedUser = await strapi.plugins['users-permissions'].services.jwt.verify(jwt);

        // const studioProfile = await verifyProfile(ctx);
        if (verifiedUser) {
            const studioProfile = await profileQuery.findOne({
                where: { user: { email: token.email } },
                populate: {
                    user: true,
                    social: {
                        populate: ['studio_social_posts', 'studio_social_campaigns', 'studio_social_channels']
                    },
                    breath: {
                        populate: {
                            'breathwork_studio_workouts': {
                                populate: ['routines']
                            },
                            'breathwork_studio_routines': true
                        }
                    },
                    market: {
                        populate: ['studio_market_carts', 'studio_market_orders']
                    },
                    poetry: {
                        populate: ['poetic_notion_entries']
                    },
                },
            });
            const profileData = await studioProfile;

            console.log({ jwt, token })
            console.log({ profileData });
            return profileData;

        } else {
            return { error: "Invalid Token" }
        }
    }

    const createOrUpdate = async (user, { files } = {}) => {

        // Find Existing STUDIO PROFILE for User
        const existingProfile = await profileQuery.findOne({
            where: { user: { email: user.email } }, populate: ['user']
        });
        const profile = await existingProfile;

        // Prepare Profile Entry
        let entry = { empty: true };

        if (!profile) {
            //If no Profile exists for User
            const ts = new Date().getTime();
            const existingUser = await userQuery.findOne({
                select: '*',
                where: { email: user.email },
                populate: { category: true },
            });

            // Create Studio Profile
            const identifier = existingUser.email.replace("@", "_").replace(".", "_");

            const profileData = {
                user: existingUser,
                name: existingUser.email,
                identifier: identifier,
                firstLogin: ts,
                lastLogin: ts,
                loginCount: 1,
                active: true
            }

            // console.log("PROFILE", { profileData })

            entry = await strapi.entityService.create('plugin::studio-profile.profile', {
                data: profileData
            });


        } else {
            // Otherwise Update existing Studio Profile
            let { loginCount } = profile;
            const profileUpdate = {
                ...profile,
                lastLogin: ts,
                loginCount: ++loginCount
            }
            entry = await profileQuery.update({
                where: { id: profile.id },
                data: { ...profileUpdate }
            });
        }

        // console.log({ entry });
        return entry;
    }

    const verifyProfile = async (ctx) => {
        const { user, token } = ctx.request.body;
        const verified = await strapi.plugins['users-permissions'].services.jwt.verify(token.jwt);

        // console.log("PROFILE_SERVICE", { user, token, verified })

        if (user.email) {
            if (user.email === token.email) {
                try {

                    const identifierData = { "email": user.email };
                    const identifier = user.email.replace("@", "_").replace(".", "_");

                    const studioUser = await strapi.plugins['users-permissions'].services.user.fetch(token.id);
                    const profile = await studioUser;

                    const studioProfile = await profileQuery.findOne({
                        where: { user: { email: profile.email } },
                        populate: { user: true },
                    });

                    console.log({ studioProfile })

                    if (!studioProfile) {
                        // Create Profile
                        const profileUser = await createOrUpdate(user)
                        // Build Results for Verified User.
                        return {
                            profile: profileUser,
                            verified,
                            email: user.email,
                            studioToken: token.jwt
                        }
                    } else {
                        // Update Studio Profile
                        let { loginCount } = studioProfile;
                        const profileUpdate = {
                            ...studioProfile,
                            lastLogin: new Date().getTime(),
                            loginCount: ++loginCount
                        }
                        const updatedProfile = await profileQuery.update({
                            where: { id: studioProfile.id },
                            data: { ...profileUpdate }
                        });
                        return {
                            profile: updatedProfile,
                            verified,
                            email: updatedProfile.email,
                            studioToken: token.jwt
                        }
                    }
                } catch (error) {
                    ctx.send("ERROR", error)
                }
            } else {
                ctx.send({ error: "Incorrect parameters : Email Mismatch" })
            }
        } else {
            ctx.send({ error: "Incorrect parameters : Missing Email" })
        }

    }



    return {
        index,
        getProfile,
        verifyProfile,
        createOrUpdate
    }
};
