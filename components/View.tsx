"use client";

import updateViews from "@/app/actions/updateViews";
import Ping from "@/components/Ping";
import {useEffect, useState} from "react";

const View = ({id, views}: { id:string, views:number}) => {
    const [totalViews, setTotalView] = useState<number | null>(null);

    useEffect(() => {
        const fetchAndUpdateViews = async ()=>{
            try{
                setTotalView(views);
                await updateViews(id, views);
            }catch (e) {
                console.error("Fail on Fetching and Updating Views",e);
            }
        };
        fetchAndUpdateViews();
    });

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