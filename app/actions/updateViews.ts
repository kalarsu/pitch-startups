"use server"

import React from 'react'
import {writeClient} from "@/sanity/lib/write-client";

const UpdateViews = async(id: string, totalViews: number) => {
    try{
        await writeClient
            .patch(id)
            .set({views: totalViews +1})
            .commit()
    }catch(e){
        console.error("Fail to update views:",e);
    }
}
export default UpdateViews
