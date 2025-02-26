import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_VIEW_QUERY} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";
import {unstable_after as after} from "next/server"; //latest Next.js use 'after' instead of 'unstable_after' 2/25/2025


const View = async ({id}: { id: string }) => {
    const {views: totalViews} = await client
        .withConfig({useCdn: false})
        .fetch(STARTUP_VIEW_QUERY, {id});
    // PPR: {useCdn: false} Fetches live SSR:Server Side Rendering, real-time data directly from Sanity's API. PPR: Partial PreRendering
    // Non-PPR {useCdn: true} default, Fetches data from Sanity's cached Content Delivery Network (CDN) for faster responses.

    //update the number of views
    after( async() => await writeClient
        .patch(id)
        .set({ views: totalViews +1 })
        .commit())
    //patch is used to "update"

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping/>
            </div>
            <p className="view-text">
                <span className="font-black">Views: {totalViews}</span>
            </p>
        </div>
    )
}
export default View