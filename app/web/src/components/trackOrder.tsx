
import { useState,useEffect } from "react";
import Loding from "./loding";
import Tab from "./Tab";
import { api } from "web.utils/src/api";
import {padLeadingZeros,getDayName,getMonthName} from '../global';


const DeliveryStatus = (props) => {
    return (
        <div>
            <div
                className={(props.active ? "bg-blue-700" : "bg-gray-200") + " rounded-full"}
                style={{ width: '0.6rem', height: '0.6rem', transform: 'translateX(-0.3rem)' }}
            ></div>
            <div className={(props.active ? "border-blue-700" : "border-gray-200") + " border-l pl-3 flex flex-col space-y-2 text-gray-200"}>
                <div className="flex justify-between">
                    <span className={(props.active ? "text-blue-700 " : "") + " font-semibold"}>
                        {props.title?props.title:"Notitle"}
                    </span>
                    <span className="text-gray-400">{props.time?props.time:"NoTime"}</span>
                </div>
                <span className={props.active ? "text-gray-500" : "text-gray-200"}>{props.desc?props.desc:"Nodecs"}</span>
            </div>
        </div>
    )
}

export default (props) => {
    const [loding, setLoding] = useState(true);
    const [statuses,setStatuses] = useState<any>([]);
    const [trackOrderId,setTrackOrderId] = useState("");


    useEffect(()=>{
        if(props.id){
        api(`/api/transaksi/${props.id}/track-order`).then((e)=>{
            if(e){
                let data = new Array();
                e.data.forEach((x,i) => {
                    let nd  = new Date(x.created_at);
                    console.log("dt",nd);
                    var ampm = nd.getHours( ) >= 12 ? ' PM' : ' AM';
                    let out = {
                        active:i==0?true:false,
                        title:`System: ${getDayName(nd.getDay())}, ${nd.getDate()} ${getMonthName(nd.getMonth())} ${nd.getFullYear()}`,
                        desc: x.track_template.desc,
                        time: padLeadingZeros(nd.getHours(),2)+":"+padLeadingZeros(nd.getMinutes(),2)+ampm
                    }
                    data.push(out);
                });
                setStatuses(data);
                setLoding(false);
            }else{
                console.log("gagal")
            }
            
        })
        setTrackOrderId(padLeadingZeros(props.id,6))
        }
    },[])
    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab mode={2} />
                <div className="h-full overflow-y-auto space-y-4">
                    <div className="flex flex-col px-6 space-y-4">
                        <span className="font-bold text-2xl">Track Order #{trackOrderId}</span>
                        <span className="text-lg">Delivery Status</span>
                    </div>
                    <div className="px-6 w-full flex flex-col space-y-4">
                        {statuses.map((x,i)=>(
                            <DeliveryStatus key={i} active={x.active} title={x.title} time={x.time} desc={x.desc}/>
                            
                            ))}

                    </div>

                </div>
            </div>
        </>
    )
}