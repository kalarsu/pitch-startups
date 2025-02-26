import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false (fetch live  SSR:Server Side Rendering: provide fresh data with each user request) if statically generating page, using ISR or tag-based revalidation,
  // (Set to true: ISR (incremental static Regeneration): Sanity will cache data for 60 second then revalidate the content after 60 seconds: ISR: Incremental Static Regeneration)
})
