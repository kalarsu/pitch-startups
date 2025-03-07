import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({
             user: {name, email, image},
             profile: {id, login, bio}
        }) {

            const existingUser = await client
                .withConfig({useCdn: false})
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id,
                });
            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || "",
                });
            }

            return true; //return true to continue to the signin process
        },

        async jwt({token, account, profile}) {
            console.log("Inside JWT callback");
            console.log("Account:", account); // Should be `undefined` after first login
            console.log("Profile:", profile); // Should be `undefined` after first login

            if (account && profile) {
                console.log("Fetching user from Sanity...");
                const user = await client
                    .withConfig({useCdn: false})
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

                token.id = user?._id || "";
                token.githubProfile = profile;
                console.log("Fetched user id:", user?._id, ",profile.id", profile.id);
            }else{
                console.log("Skipping Sanity fetch because account/profile is missing");
            }
            console.log("Returning JWT token:", token);
            return token;
        },

        // async session({session, token}) {
        //     Object.assign(session, {id: token.id});
        //     return session;
        // },

        async session({session, token}) {
            session.user.id = token.id;
            Object.assign(session, {id: token.id});
            console.log("Session callback token:", token.id);
            return session;
        }
    },
});