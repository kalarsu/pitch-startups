import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation, (Set to true: ISR: Sanity will cache data for 60 second then revalidate the content after 60 seconds: ISR: Incremental Static Regeneration)
    token,
})

if(!writeClient.config().token){
    throw new Error("Write token not found!");
}