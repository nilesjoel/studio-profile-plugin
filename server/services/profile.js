'use strict';

// TODO: TESTING MAGIC LINK for [Studio Profile] Verification -----
// const { Magic } = require('@magic-sdk/admin');

// const mAdmin = new Magic(process.env.MAGIC_SECRET_API_KEY); // ✨

const _ = require('lodash');
const { DateTime, Duration } = require("luxon");
// EMD TESTING MAGIC LINK for [Studio Profile] Verification -----

/**
 *  service
 */

const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const profileWarn = chalk.keyword('pink'); // Orange color
const colorPink = chalk.keyword('pink'); // Green color
const coverMedia = chalk.keyword('blue'); // Blue color

module.exports = ({ strapi }) => {

    const profileQuery = strapi.db.query('plugin::studio-profile.profile');
    const userQuery = strapi.db.query('plugin::users-permissions.user');
    const websiteQuery = strapi.db.query('plugin::studio-website.website');

    // TODO: REMOVE or REPLACE with useable code.
    // Potentially use this to list available services.
    const index = async (ctx) => {
        return {
            apiDetail: "Studio Profile : Services Index",
            ctx
        };
    }



    const getProfile = async ({ token }) => {
        // console.log("getProfile::", { token })
        const { jwt, email } = token;
        // Verify User Token
        const verifiedUser = await strapi.plugins['users-permissions'].services.jwt.verify(jwt);
        // console.log("VERIFIED USER", { verifiedUser, jwt, email });

        // Find Website Profile
        if (verifiedUser) {
            // console.log("getProfile:: ", { email })
            // const studioUser = await getStudioUser(email);
            // console.log("STUDIO USER", { email, studioUser })
            // If User Token is Valid, find Studio Profile
            try {
                console.log("GONNA TRY TO GET PROFILE", { email, token }, JSON.stringify({ "tokenEmail": token.email }))
                const studioProfile = await profileQuery.findMany({
                    where: {
                        $and: [
                            { user: { email: token.email } },
                            { website: { uid: token.site } }]
                    },
                    populate: {
                        user: true,
                        menus: true,
                        schemaMetadata: {
                            select: ['id', 'fieldName', 'editable', 'fieldLabel', 'required', 'tableName', 'fieldType', 'gridSize', 'validators'],
                            populate: { 'tags': { select: ['id', 'title', 'context', 'slug'] } }
                        },
                        website: {
                            select: ['uid', 'siteBrandName', 'name'],
                            populate: {
                                pages: {
                                    select: ['uid', 'name', 'title', 'description', 'cta'],
                                    populate: { metadata: true, cover: { populate: true } }
                                },
                                webads: {
                                    select: ['uid', 'slug', 'title', 'description', 'cta'],
                                    populate: {
                                        metadata: true,
                                        cover: { populate: true }
                                    }
                                },
                                webimages: {
                                    select: ['uid', 'slug', 'title', 'description'],
                                    populate: {
                                        cover: {
                                            select: ['width', 'height', 'url', 'formats'],
                                        },
                                        media: {
                                            select: ['width', 'height', 'url', 'formats']
                                        }
                                    }
                                },
                                weblinks: { select: ['uid', 'segment', 'title', 'slug'] },
                                websocials: { select: ['uid', 'handle', 'provider', 'slug'] }
                            }
                        }
                    },
                });
                const profileData = await studioProfile; // TODO:: what EXACTLY is happening here?

                // In case there are multiple profiles, there should not be.
                if (profileData.length > 1) {
                    // TODO : Delete all profiles but the one with the most recent login.
                }



                const buildImageFormats = (formats) => {
                    // Define Image Formats
                    const imageFormats = Object.keys(formats);
                    // Build Simplified Image Object
                    const simplifiedImage = {};
                    imageFormats.forEach((format) => {
                        // Define Image Properties
                        const img = formats[format];
                        const { width, height, url, hash } = img;
                        // Image Properties 
                        simplifiedImage[format] = { width, height, url, hash };
                    })
                    return simplifiedImage;
                }


                const webimages = profileData[0].website?.webimages;

                let webimagesSimplified = [];
                webimages?.forEach((image) => {

                    const { uid, slug, title, description, cover, media } = image;
                    const { width, height, url, formats } = cover;

                    // Build Simplified Image Object for Cover
                    const coverImageFormats = buildImageFormats(formats);
                    const coverImage = { ...coverImageFormats, width, height, url}
                    // console.log(coverMedia("COVER IMAGE", JSON.stringify({ image }, null, 2)));

                    // Build Simplified Image Object for Media
                    let mediaImage = [];
                    media.forEach((img) => {
                        const { formats } = img;
                        const imgFormats = buildImageFormats(formats);
                        mediaImage[mediaImage.length] = imgFormats;
                        // console.log(coverMedia("IMAGE MEDIA", JSON.stringify({ img }, null, 2)));
                    });

                    // console.log(coverMedia("MEDIA IMAGE", JSON.stringify({ uid, webimagesMedia }, null, 2)));

                    webimagesSimplified[webimagesSimplified.length] = {
                        uid, 
                        slug, 
                        title, 
                        description, 
                        cover : coverImage, 
                        media : mediaImage
                    }

                })


                // console.log(coverMedia("MEDIA IMAGE", JSON.stringify({ webimagesSimplified }, null, 2)));
                
                
                profileData[0].website.webimages = webimagesSimplified;


                // Test : Logging
                // console.log(profileWarn("GET PROFILE::==",
                //     JSON.stringify(webimages, null, 2),
                //     // Object.keys(webimagesSimplified)));
                // ));

                return profileData[0];
            } catch (err) {
                console.log(profileWarn("ERROR:GET_PROFILE", err));
                throw new Error("Profile Not Found", "GET_PROFILE--------", { err })
            }

        } else {
            throw new UnauthorizedError("Invalid Token", "GET_PROFILE", { verifiedUser })
        }
    }

    // const createOrUpdate = async (user, { files } = {}) => {

    //     // Find Existing STUDIO PROFILE for User
    //     const existingProfile = await profileQuery.findOne({
    //         where: { user: { email: user.email } }, populate: ['user']
    //     });
    //     const profile = await existingProfile;

    //     // Prepare Profile Entry
    //     let entry = { empty: true };

    //     if (!profile) {
    //         //If no Profile exists for User
    //         const ts = new Date().getTime();
    //         const existingUser = await userQuery.findOne({
    //             select: '*',
    //             where: { email: user.email },
    //             populate: { category: true },
    //         });

    //         // Create Studio Profile
    //         const identifier = existingUser.email.replace("@", "_").replace(".", "_");

    //         const profileData = {
    //             user: existingUser,
    //             name: existingUser.email,
    //             identifier: identifier,
    //             firstLogin: ts,
    //             lastLogin: ts,
    //             loginCount: 1,
    //             active: true
    //         }

    //         // console.log("PROFILE", { profileData })

    //         entry = await strapi.entityService.create('plugin::studio-profile.profile', {
    //             data: profileData
    //         });


    //     } else {
    //         // Otherwise Update existing Studio Profile
    //         let { loginCount } = profile;
    //         const profileUpdate = {
    //             ...profile,
    //             lastLogin: ts,
    //             loginCount: ++loginCount
    //         }
    //         entry = await profileQuery.update({
    //             where: { id: profile.id },
    //             data: { ...profileUpdate }
    //         });
    //     }

    //     // console.log({ entry });
    //     return entry;
    // }

    const verifyProfile = async ({ token }) => {
        const { jwt, email } = token;
        const jwtVerified = await strapi.plugins['users-permissions'].services.jwt.verify(jwt);
        // console.log("to VERIFY....", { token, jwtVerified })

        if (jwtVerified) {
            const existingUser = await getStudioUser(email);

            console.log("verify", { email, existingUser })
            // console.log("VERIFY:PROFILE_SERVICE", { token, jwtVerified })

            if (existingUser.email) {
                if (existingUser.email === token.email) {
                    try {

                        // TODO: REMOVE THIS CODE IT SHOULD NOT BE USED.
                        // const identifierData = { "email": user.email };
                        // const identifier = user.email.replace("@", "_").replace(".", "_");

                        // const studioUser = await strapi.plugins['users-permissions'].services.user.fetch(token.id);
                        // const profile = await studioUser;

                        // const studioProfile = await profileQuery.findOne({
                        //     where: { user: { email: profile.email } },
                        //     populate: { user: true },
                        // });
                        // console.log("TO CREATE OR UPDATE________________________________________")
                        const studioProfile = await createOrUpdateProfile(token);
                        return studioProfile;
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


    }


    const createOrUpdateProfile = async (token) => {
        const { email, site } = token;
        // console.log("CREATE OR UPDATE PROFILE", { email, site })


        const studioProfile = await profileQuery.findMany({
            where: {
                $and: [
                    { user: { email: email } },
                    { website: { uid: site } }]
            },
            populate: {
                user: true,
                menus: true,
                website: true
            },
        });

        // If no Profile exists for User...
        if (studioProfile.length < 1) {

            // console.log("TODO: CREATE SITE SPECIFIC PROFILE")

            const siteProfile = await createSiteProfile(email, site)

            // console.log({ siteProfile })
            // TODO: REMOVE THIS IT SHOULD NOT BE USED
            // // Create Profile
            // const profileUser = await createOrUpdate(user)
            // // Build Results for Verified User.
            // return {
            //     profile: profileUser,
            //     verified,
            //     email: user.email,
            //     studioToken: token.jwt
            // }
            return siteProfile;

        } else {
            // console.log("TIME TO UPDATE PROFLIE LOGIN COUNT-----------------")
            // Update Studio Profile
            const profileData = studioProfile[0];
            let { loginCount } = profileData;
            const { id: profileId } = profileData;

            const profileUpdate = {
                ...studioProfile,
                lastLogin: new Date().getTime(),
                loginCount: ++loginCount
            }
            const updatedProfile = await profileQuery.update({
                where: { id: profileId },
                data: { ...profileUpdate }
            });
            return {
                profile: updatedProfile,
                verified,
                email: updatedProfile.email,
                studioToken: token.jwt
            }
        }

    }


    const createSiteProfile = async (email, site) => {

        try {
            // Get Website
            const websiteEntity = await websiteQuery.findOne({
                where: { uid: site }, populate: ['menus']
            });
            const websiteData = await websiteEntity;

            // Define Existing User
            const existingUser = await getStudioUser(email);

            // Define Profile Data
            const profileIdentifier = `${site.replace("-", "_")}_${existingUser.email.replace("@", "_").replace(".", "_")}`;

            // Define Default Website Menus 
            // TODO: Define method to create default menus from Studio Profile plugin SETTINGS
            const { menus } = websiteData;

            // Define 'Now' Timestamp
            const ts = new Date().getTime();

            const profileData = {
                user: existingUser,
                name: existingUser.email,
                identifier: profileIdentifier,
                uid: profileIdentifier,
                firstLogin: ts,
                lastLogin: ts,
                menus: menus,
                website: websiteData,
                loginCount: 1,
                active: true
            }

            // console.log("CREATING NEW PROFILE------------", { profileIdentifier })

            // TODO: UNCOMMENT THIS TO ACTUALLY CREATE THE PROFILE
            const entry = await strapi.entityService.create('plugin::studio-profile.profile', {
                data: profileData
            });

            return entry;

        } catch (err) {
            console.error(err);
            throw new Error(err);
        }

    }


    const getStudioUser = async (email) => {

        // console.log({email})

        try {
            const existingUser = await userQuery.findOne({
                select: '*',
                where: { email: email },
                populate: { category: true },
            });

            // console.log("EXISTING USER", { email, existingUser })

            return existingUser;
        } catch (err) {
            console.log("ERROR:GET_STUDIO_USER", err)
        }
    }

    const testMagicLink = async (ctx) => {


        // Trigger Magic link to be sent to user
        let didToken = await mAdmin.auth.loginWithMagicLink({ email });

        return didToken;
    }

    return {
        index,
        getProfile,
        verifyProfile,
        testMagicLink
    }
};
