"use client";

import React, {Suspense} from 'react'
import View from "@/components/View";
import {Skeleton} from "@sanity/ui";

const ViewWrapper = ({id, views}: {id:string, views:number}) => {
    return (
        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
            <View id={id} views={views}/>
        </Suspense>
    )
}
export default ViewWrapper
