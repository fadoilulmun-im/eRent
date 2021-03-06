import Loding from "./loding";
import Tab from "./Tab";
import { useEffect, useRef, useState } from "react";
import { api } from 'web.utils/src/api';
import PriceBox from './comp/priceBox';
import { Page, Popup } from 'framework7-react';
import { numberWithCommas, padLeadingZeros } from "../global";
import { motion } from "framer-motion";
import StatusPill from "./comp/statusPill";
import Image from './comp/image';


const OrderItem = (props) => {

    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <div onClick={() => { location.href = "/m/order-detail-mobile/" + props.id }} className="flex self-stretch flex-col space-y-4 items-start justify-start">
            <div className="flex self-stretch flex-col space-y-3 items-start justify-start px-6">
                <div className="flex self-stretch space-x-4 items-center justify-between">
                    <div className="text-base font-bold leading-relaxed text-coolGray-900">
                        Order ID #{padLeadingZeros(props.id, 6)}
                    </div>
                    <div className="text-xs italic font-italic leading-tight text-right text-blue-400">
                        {props.status}
                    </div>
                </div>
                <div className="flex self-stretch space-x-3 items-start justify-start">
                    <div  className={"bg-gray-100 p-2 rounded"}>
                        {/* <img src="/fimgs/377_3018.x1.png" /> */}
                        <Image src={props.img} style={{maxHeight:'3rem',maxWidth:'3rem'}}/>

                    </div>


                    <div className="flex flex-col space-y-0.5 items-start justify-start">
                        <div className="text-base font-medium leading-relaxed text-coolGray-900">
                            {props.title}
                        </div>
                        <div className="text-sm leading-snug text-coolGray-500">Rp{numberWithCommas(props.one_cost)} x{props.one_qty}</div>
                    </div>
                </div>

                <div className="flex self-stretch space-x-4 items-center justify-between">
                    <div className="text-sm leading-snug text-coolGray-500">{props.items} more items</div>
                    <div className="text-base font-medium leading-relaxed text-right text-coolGray-900">
                        Rp{numberWithCommas(props.total_cost)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default () => {
    const [user, setUser] = useState<any>({});

    const [loding, setLoding] = useState(true);
    const [statusSwitch, setStatusSwitch] = useState(0);
    const status = [
        "All Orders", 
        "Pending", 
        "Waiting for Confirmation", 
        "Payment Verified",
        "Packed",
        "On The Way",
        "Arrived", 
        "On Return",
        "Completed", 
        "Cancelled",
    ]

    const [orders, setOrders] = useState<any>([]);
    useEffect(() => {
        let uu = localStorage.getItem('user')
        if (uu) {
            let u = JSON.parse(uu)
            setUser(u)
        }
    }, [])

    useEffect(() => {

        if (user.id) {
            console.log("User",user);
            api(`/api/customer/${user.id}/orders${statusSwitch == 0 ? "" : "?status=" + statusSwitch}`).then((e) => {
                if (e.status == 'SUCCESS') {
                    setOrders(e.data);
                    setLoding(false);
                }
            })
        }

    }, [user, statusSwitch])

    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab />
                <div className="w-full flex justify-start overflow-x-auto py-2" style={{ height: '5.5rem' }}>
                    <div className="px-6 flex space-x-3" style={{ paddingBottom: '1rem' }}>
                        {status.map((x, i) => (
                            <StatusPill key={i} onClick={() => { setStatusSwitch(i) }} active={statusSwitch == i} title={x} />
                        ))}

                    </div>
                </div>
                <div className="h-full overflow-y-auto space-y-6" style={{ paddingBottom: '2rem' }}>


                    {orders.length > 0 ? orders.map((x, i) => (x.detail_transaksi.length > 0 ?
                        <OrderItem key={i} id={x.id} title={x.detail_transaksi[0].barang.nama_barang}
                            total_cost={x.total_harga}
                            one_cost={x.detail_transaksi[0].total_harga}
                            one_qty={x.detail_transaksi[0].quantity}
                            items={x.detail_transaksi.length}
                            img={x.detail_transaksi[0].barang.gambar_barang}
                            status={status[Number(x.status_transaksi)]}
                        /> : ""
                    )) : (
                        <span className="flex items-center justify-center p-5">Empty</span>
                    )}


                </div>
            </div>
        </>
    )
}