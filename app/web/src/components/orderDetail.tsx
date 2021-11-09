import Loding from "./loding";
import Tab from "./Tab";
import { useEffect, useRef, useState } from "react";
import { api } from 'web.utils/src/api';
import PriceBox from './comp/priceBox';
import { Page, Popup } from 'framework7-react';
import { numberWithCommas, padLeadingZeros,fileUpload } from "../global";
import { motion } from "framer-motion";
import Address from "./comp/address";
import SelectBox from "./comp/selectBox";
import SaveCancel from "./saveCancel";

const dateFormat = (dt) => {
    const dat = new Date(dt);
    return dat.getDay() + "/" + dat.getMonth() + "/" + dat.getFullYear()
}

const Item = (props) => {
    return (
        <div className="flex w-full items-center space-x-3 px-6">
            <span style={{ width: '5rem', height: '5rem' }} className=" overflow-hidden rounded bg-gray-100 flex justify-center items-center p-2">
                <img src="/fimgs/232_297.x1.svg" />
            </span>
            <div className="flex flex-col space-y-2">
                <span className=" font-semibold text-lg">{props.title}</span>
                <span className=" text-gray-400">Rp{numberWithCommas(props.price)} x{props.qty}</span>
            </div>
        </div>
    )
}



const PendingPage = (props) => {
    const file = useRef<HTMLInputElement>(null);
    const [fileName,setFileName] = useState("No file choosen.")
    const [fileData,setFileData] = useState(null)
    const getFileName = (e) => {
        if (e?.target) {
            setFileName(e.target.files[0].name)
            setFileData(e.target.files[0])
            console.log(e.target.files[0].name)
        }
    }
    const upload = ()=>{
        fileUpload(fileData,`/api/transaksi/${props.data.id}/upload-bukti`).then((e)=>{
            console.log(e);
        })
    }
    return (
        <div style={{ height: '100%' }} className="flex flex-col">
            <input ref={file} type="file" onChange={getFileName} hidden />
            <Tab mode={2} onBack={props.pop} />
            <div className="flex flex-col  h-full space-y-4" >
                <span className="px-6 font-bold text-2xl">Pending Order</span>


                <div className="px-6 space-y-4">
                    <span className="text-lg">Payment Detail</span>
                    <div className="flex justify-between">
                        <span>Transaction ID</span>
                        <span>{props.data.id ? padLeadingZeros(props.data.id, 6) : 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total</span>
                        <span>Rp{props.data.total_harga ? numberWithCommas(props.data.total_harga) : 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Bank Name</span>
                        <span>{props.data.bank ? props.data.bank.nama : "BCA"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Account Owner</span>
                        <span>{props.data.bank ? props.data.bank.atas_nama : "Farid"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Account Number</span>
                        <span>{props.data.bank ? props.data.bank.no_rekening : "000"}</span>
                    </div>
                </div>



                <span className="px-6 text-lg text-gray-500">Upload proof of payment</span>
                <div className="flex space-x-2 items-center justify-start px-6 ">
                    <div className="flex items-center justify-start px-4 py-2 bg-blue-700 rounded">
                        <button
                        style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            onClick={() => {
                                file.current?.click();
                            }}
                            className="text-base leading-relaxed text-center text-white"
                        >
                            Choose File
                        </button>
                    </div>
                    <div className="text-base leading-relaxed text-center text-coolGray-500 truncate ">
                        {fileName}
                    </div>

                </div>
                <div className="px-6 text-blue-700">
                    NB: Important! Please transfer to the last 3 digits so that our system
                    can recognize your payment.
                </div>
            </div>
            <SaveCancel title={"Send"} onSave={()=>{props.data?upload():""}} />
        </div>
    )
}


export default (props) => {
    const [user, setUser] = useState<any>({});

    const [loding, setLoding] = useState(true);
    const [statusSwitch, setStatusSwitch] = useState(0);

    const status = [
        "All Orders", "Cancelled",
        "Completed", "On Return",
        "Arrived", "On The Way",
        "Packed", "Waiting for Confirmation",
        "Pending"]
    const allShipping = [
        { name: "Erent Pickup", cost: 1000, icon: (<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem' }} viewBox="0 0 24 24"><path fill="#000000" d="M1,12.5v5a1,1,0,0,0,1,1H3a3,3,0,0,0,6,0h6a3,3,0,0,0,6,0h1a1,1,0,0,0,1-1V5.5a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v2H6A3,3,0,0,0,3.6,8.7L1.2,11.9a.61.61,0,0,0-.07.14l-.06.11A1,1,0,0,0,1,12.5Zm16,6a1,1,0,1,1,1,1A1,1,0,0,1,17,18.5Zm-7-13a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1v11h-.78a3,3,0,0,0-4.44,0H10Zm-2,6H4L5.2,9.9A1,1,0,0,1,6,9.5H8Zm-3,7a1,1,0,1,1,1,1A1,1,0,0,1,5,18.5Zm-2-5H8v2.78a3,3,0,0,0-4.22.22H3Z" /></svg>) },
        { name: "Self Pickup", cost: 0, icon: (<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem' }} viewBox="0 0 24 24"><path fill="#000000" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" /></svg>) },
    ]

    const [transaction, setTransaction] = useState<any>({})

    const [detailPop, setDetailPop] = useState(false);

    useEffect(() => {
        let uu = localStorage.getItem('user')
        if (uu) {
            let u = JSON.parse(uu)
            console.log(u)
            setUser(u)

            api(`/api/order-detail/${props.id}`).then((e) => {

                if (e.status == 'SUCCESS') {
                    setTransaction(e.data)
                    console.log(e)
                    setLoding(false)
                }
            })
        }
    }, [])

    const countItem = () => {
        let ttl = 0;
        if (transaction) {
            transaction.detail_transaksi.forEach((x, i) => {
                ttl += x.quantity;
            });
            console.log(ttl);
        }
        return ttl;
    }

    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab mode={2} />
                <div className="h-full overflow-y-auto space-y-6" style={{ paddingBottom: '2rem' }}>
                    <div className="text-2xl font-bold text-coolGray-900 px-6">
                        Order ID #{padLeadingZeros(transaction.id, 6)}
                    </div>
                    <div className="px-6 flex justify-between w-full">
                        <span className="text-blue-200 italic">{transaction.status ? transaction.status.nama : "nan"}</span>
                        <span className="text-coolGray-300 text-xs font-bold" onClick={() => { setDetailPop(true) }}>See detail</span>
                    </div>
                    <div className="px-6 w-full space-y-4">
                        <div className="text-base font-bold leading-relaxed text-coolGray-900">
                            Rent Date
                        </div>
                        <div className="flex flex-col space-y-2 text-coolGray-900">
                            <div className="flex justify-between">
                                <span>Start Date</span>
                                <span>{dateFormat(transaction.tanggal_peminjaman)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>End Date</span>
                                <span>{dateFormat(transaction.tanggal_pengembalian)}</span>
                            </div>
                        </div>
                    </div>


                    <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
                        <div className="text-base font-bold leading-relaxed text-coolGray-900 px-6">
                            Produc Detail
                        </div>


                        {transaction.detail_transaksi ? transaction.detail_transaksi.map((x, i) =>
                            (<Item key={i} title={x.barang.nama_barang} price={x.barang.harga_barang} qty={x.quantity} />)) : "None"}

                        {transaction.alamat ? <Address canEdit={true} title="Delivery information" data={transaction.alamat} onEdit={() => { location.href = '/m/my-address-mobile' }} /> : ""}

                        {transaction.bank ? <SelectBox header="Payment Method" icon={<img style={{ width: '3rem' }} src="/fimgs/262_242.x3.png" />}
                            title={transaction.bank.nama} /> : ""}
                        {transaction ? <SelectBox header="Shipping" icon={allShipping[transaction.is_kirim ? 0 : 1].icon}
                            title={allShipping[transaction.is_kirim ? 0 : 1].name} /> : ""}


                        {transaction.bank ? (<div className="flex self-stretch flex-col space-y-4 items-start justify-start px-6">
                            <div className="flex items-center justify-start">
                                <div className="text-base font-bold leading-relaxed text-coolGray-900">
                                    Detail Transaction
                                </div>
                            </div>
                            <div className="flex self-stretch flex-col space-y-3 items-start justify-start">
                                <div className="flex self-stretch space-x-4 items-start justify-between">
                                    <div className="text-sm leading-snug text-coolGray-900">
                                        Total Cost
                                    </div>
                                    <div className="text-sm leading-snug text-right text-coolGray-900">
                                        Rp{numberWithCommas(Number(transaction.total_harga))}
                                    </div>
                                </div>
                                <div className="flex self-stretch space-x-4 items-start justify-between">
                                    <div className="text-sm leading-snug text-coolGray-900">
                                        Shipping Total
                                    </div>
                                    <div className="text-sm leading-snug text-right text-coolGray-900">
                                        Rp{numberWithCommas(allShipping[transaction.is_kirim ? 0 : 1].cost)}
                                    </div>
                                </div>
                                <div className="flex self-stretch space-x-4 items-start justify-between">
                                    <div className="text-sm leading-snug text-coolGray-900">
                                        Admin Cost
                                    </div>
                                    <div className="text-sm leading-snug text-right text-coolGray-900">
                                        Rp{numberWithCommas(Number(transaction.bank.biaya_admin))}
                                    </div>
                                </div>
                                <div className="flex self-stretch space-x-4 items-start justify-between">
                                    <div className="text-sm leading-snug text-coolGray-900">
                                        Unique Code
                                    </div>
                                    <div className="text-sm leading-snug text-right text-coolGray-900">
                                        Rp{numberWithCommas(transaction.kode_unik)}
                                    </div>
                                </div>
                            </div>
                        </div>) : ""}

                    </div>



                </div>

                <PriceBox btnClick={() => { }} total_item={transaction.detail_transaksi ? countItem() : 0} total_harga={transaction ? transaction.total_harga : 0} btn_title={transaction.status ? (transaction.status.id == 8 ? "Cancel Order" : "Track Order") : "Oke"} />
            </div>

            <Popup onPopupClose={() => { setDetailPop(false) }} opened={detailPop} className="demo-popup-swipe" swipeToClose>
                <PendingPage data={transaction} pop={() => { setDetailPop(false) }} />
            </Popup>
        </>
    )
}