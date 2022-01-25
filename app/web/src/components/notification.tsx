import React, { useState, useEffect } from 'react';
import { api } from 'web.utils/src/api';
import { getMonthName,padLeadingZeros} from '../global';
import Tab from './Tab';
import Loding from './loding';
// import {padLeadingZeros,getDayName,getMonthName} from '../global';



const NotifItem = (props)=>{
    return (
        <div className="border-b px-6 py-3">
            <div className="flex justify-between pb-2 ">
                <span className=" font-bold" style={{maxWidth:'70%'}}>{props.title||"no title"}{" "}{props.date||"no date"}</span>
                <span className="font-base text-gray-400">{props.time||"no time"}</span>
            </div>
            <div>
            {props.desc||"no description"}
            </div>
        </div>
    )
}


export default () => {
    const [user, setUser] = useState<any>({});
    const [loding, setLoding] = useState(true);
    const [notifs,setNotifs] = useState<any>([]);

    useEffect(()=>{
        const u = localStorage.getItem('user');
        if (u) {
            const uu = JSON.parse(u)
            setUser(uu);
            api(`/api/customer/${uu.id}/notif/showall`).then((e)=>{
                let p = e.data.map((x,i)=>{
                    let dt = new Date(x.created_at.split('.')[0]);
                    var ampm = dt.getHours( ) >= 12 ? ' PM' : ' AM';
                    console.log(x.created_at);
                    console.log(dt);
                    return {"desc":x.desc,"title":x.title,"date":dt.getDate()+" "+getMonthName(dt.getMonth())+" "+dt.getFullYear(),"time":padLeadingZeros((dt.getHours()% 12) || 12,2)+":"+padLeadingZeros(dt.getMinutes(),2)+ampm};
                })
                setLoding(false);
                console.log(p);
                setNotifs(p);

            })

        }else{
            location.href = '/m/'
        }
        
    },[]);

    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab />
                <div className="h-full overflow-y-auto space-y-4 pb-4">
                    <span className="text-3xl font-bold text-coolGray-900 px-6">Notification</span>
                    {notifs.length > 0?notifs.map((x,i)=>(
                        <NotifItem title={x.title} desc={x.desc} date={x.date} key={i} time={x.time}/>
                    )):"no notif"}
                </div>
            </div>
        </>
    );
}