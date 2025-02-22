import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
//import {client} from "@/sanity/lib/client";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export default async function Home({ searchParams }: {searchParams: Promise<{query?: string}>})
{
    const query = (await searchParams).query;
    //const posts = await client.fetch(STARTUPS_QUERY);
    const params = {search: query || null};

    const {data: posts} = await sanityFetch({ query: STARTUPS_QUERY, params }); //server side fetch when there are changes made

    // const posts = [
    //     {
    //         _id: 1,
    //         _createdAt: new Date(),
    //         views: 56,
    //         author: {_id: 1, name: "Ethan Aragon"},
    //         description: "This is my startup",
    //         image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2e0280e7-7466-4036-8aeb-0d527c986afe_1280x720.jpeg",
    //         category: "Robot",
    //         title: "We Robots",
    //     },
    // ];

    return (
    <>
        <section className="pink_container">
            <h1 className="heading">
                Pitch Your Startup, <br/>
                Connect with Entrepreneurs
            </h1>
            <p className="sub-heading !max-w-3xl">
                Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
            </p>
            <SearchForm query={query} />
        </section>
        <section className="section_container">
            <p className="text-30-semibold">
                {query? `Search results for "${query}"`: "All Startups"}
            </p>
            <ul className="mt-7 card_grid">
                { posts?.length > 0 ? (
                    posts.map((post: StartupTypeCard) => (
                        <StartupCard key={post?._id}
                                     post={post}/>
                    ))
                ): (
                   <p className="no-result">No Startups found</p>
                )}
            </ul>
        </section>
        <SanityLive />
    </>
    );
}
