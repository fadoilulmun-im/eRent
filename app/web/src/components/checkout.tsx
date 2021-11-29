import Loding from "./loding";
import Tab from "./Tab";
import { useEffect, useRef, useState } from "react";
import { api } from 'web.utils/src/api';
import ChartItem from './comp/chartItem';
import PriceBox from './comp/priceBox';
import Address from "./comp/address";
import { Page, Popup } from 'framework7-react';
import { numberWithCommas } from "../global";
import SelectBox from "./comp/selectBox";
import BottomBox from "./comp/bottomBox";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}




const PaymentItem = (props) => {
    return (
        <div onClick={props.onClick} className={(props.gray ? 'bg-gray-100' : '') + " transition-all flex self-stretch space-x-3 items-center justify-start w-full p-5"}>
            <div className="flex flex-col items-center justify-center px-1 py-0.5">
                <img style={{ width: '3rem' }} src="/fimgs/262_242.x3.png" />
            </div>
            <div className="text-sm leading-snug text-coolGray-900">
                {props.title}
            </div>
        </div>
    )
}

const ShipingItem = (props) => {
    return (
        <div onClick={props.onClick} className={(props.gray ? 'bg-gray-100' : '') + " transition-all flex self-stretch space-x-3 items-center justify-start w-full p-5"}>
            <div className="flex flex-col items-center justify-center px-1 py-0.5">
                {props.icon}
            </div>
            <div className="text-sm leading-snug text-coolGray-900">
                {props.title}
            </div>
        </div>
    )
}



export default () => {

    const [user, setUser] = useState<any>({});

    const [price, setPrice] = useState({ price: 0, qty: 0 });

    const [loding, setLoding] = useState(true);
    const today = new Date();
    const [startDate, setStartDate] = useState(formatDate(today));
    const [endDate, setEndtDate] = useState(formatDate(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)));
    const [cart, setCart] = useState<any>([]);
    const [delList, setDelList] = useState([]);

    const [addrs, setAddrs] = useState({id:0});


    const [paymentPop, setPaymentPop] = useState(false);


    const [allPayment,setAllPayment] = useState<any>([]);
    // [
    //     { name: "BankA", cost: 1000 },
    //     { name: "BankB", cost: 2000 },
    //     { name: "BankC", cost: 2000 }
    // ]
    const [paymentSwitch, setPaymentSwitch] = useState(0);


    const [shippingPop, setShippingPop] = useState(false);

    const allShipping = [
        { name: "Erent Pickup", cost: 1000, icon: (<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem' }} viewBox="0 0 24 24"><path fill="#000000" d="M1,12.5v5a1,1,0,0,0,1,1H3a3,3,0,0,0,6,0h6a3,3,0,0,0,6,0h1a1,1,0,0,0,1-1V5.5a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v2H6A3,3,0,0,0,3.6,8.7L1.2,11.9a.61.61,0,0,0-.07.14l-.06.11A1,1,0,0,0,1,12.5Zm16,6a1,1,0,1,1,1,1A1,1,0,0,1,17,18.5Zm-7-13a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1v11h-.78a3,3,0,0,0-4.44,0H10Zm-2,6H4L5.2,9.9A1,1,0,0,1,6,9.5H8Zm-3,7a1,1,0,1,1,1,1A1,1,0,0,1,5,18.5Zm-2-5H8v2.78a3,3,0,0,0-4.22.22H3Z" /></svg>) },
        { name: "Self Pickup", cost: 0, icon: (<svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.5rem' }} viewBox="0 0 24 24"><path fill="#000000" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" /></svg>) },
    ]
    const [shippingSwitch, setShippingSwitch] = useState(0);

    useEffect(() => {
        // const u = localStorage.getItem('user');
        let uu = localStorage.getItem('user')
        if (uu) {
            let u = JSON.parse(uu)
            console.log(u)
            setUser(u)
            api(`/api/customer/${u.id}/cart`).then((e) => {
                if (e.status == 'SUCCESS') {
                    console.log(e);
                    setCart(e.data);
                    count(e.data, delList);
                }
                setLoding(false);
            })

            if (u.alamat_utama) {
                api(`/api/customer/alamat/${u.alamat_utama}`).then((e) => {
                    if (e.status == 'SUCCESS') {
                        console.log(e.data);
                        setAddrs(e.data);
                    }
                })
            }
        } else {
            location.href = '/m/'
        }

        api('/api/list-bank').then((e)=>{
            setAllPayment(e.data);
        })

    }, [])
    useEffect(() => {
        count(cart, delList);
    }, [startDate, endDate, paymentSwitch])


    const count = (dt: any, dls: any) => {

        let days = datediff(new Date(startDate), new Date(endDate));
        console.log(days)

        let total = 0;
        let qty = 0;
        dt.forEach((x, i) => {
            if (dls.includes(i as never)) {
                console.log("no")
            } else {
                total += x.barang.harga_barang * x.quantity;
                qty += x.quantity;
            }
        })
        setPrice({ price: (total * days), qty: qty });
        console.log(total);
    }
    const updateQty = (dt) => {
        api(`/api/customer/${user.id}/update-cart/${dt.id}`, {
            quantity: dt.quantity,
        }).then((e) => {
            console.log(e);
        });
    }
    const add = (idx) => {
        let dt = [...cart] as any;
        dt[idx]['quantity'] += 1;
        //console.log(dt);
        setCart(dt);
        count(dt, delList);
        updateQty(dt[idx]);
    }
    const sub = (idx) => {
        console.log(cart);
        let dt = [...cart] as any;
        if (dt[idx]['quantity'] > 1) {
            dt[idx]['quantity'] -= 1;
            //console.log(dt);
            setCart(dt);
            count(dt, delList);
            updateQty(dt[idx]);
        }
    }
    const del = (idx) => {
        console.log(cart[idx]);
        //setCart(cart.filter((x:any,i) => x.barang.id != (cart[idx] as any).barang.id))
        let t: any = [...delList];
        t.push(idx);
        setDelList(t);
        count(cart, t);

        //apidel
        api(
            `/api/customer/${user.id}/delete-cart/${cart[idx].id}`
        ).then((e) => {
            console.log(e);
        });
    }

    const onStartDateChange = (e) => {
        console.log(e.target.value)
        setStartDate(e.target.value)

    }
    const onEndDateChange = (e) => {
        setEndtDate(e.target.value)

    }

    const checkoutE = ()=>{
        // tanggal_peminjaman,
        // tanggal_pengembalian,
        // id_bank,
        // kirim,
        // id_alamat,
        // biaya_pengiriman,
        api(`/api/checkout/${cart[0].transaksi.id}`,
        {
            tanggal_peminjaman:startDate,
            tanggal_pengembalian:endDate,
            kirim:shippingSwitch == 0,
            id_alamat:addrs.id,
            id_bank:1,
            biaya_pengiriman:allShipping[shippingSwitch].cost

        }).then((e)=>{
            console.log(e);
            if(e.status == 'SUCCESS'){
                location.href="/m/order-detail-mobile/"+cart[0].transaksi.id;
            }
        })
        console.log(cart)
    }

    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab mode={2} />
                <div className="h-full overflow-y-auto space-y-4" style={{ paddingBottom: '2rem' }}>
                    <div className="text-3xl font-bold text-coolGray-900 px-6">Checkout</div>
                    <div className="flex flex-wrap self-stretch items-start justify-between overflow-hidden px-5">
                        <div className="flex flex-col flex-1 m-2">
                            <span>Start Date</span>
                            <div className="bg-gray-100 px-3 py-2 rounded ">
                                <input
                                    value={startDate}
                                    onChange={onStartDateChange}
                                    style={{ minWidth: '20px' }}
                                    type="date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 m-2">
                            <span>End Date</span>
                            <div className="bg-gray-100 px-3 py-2 rounded">
                                <input
                                    min={startDate}
                                    onChange={onEndDateChange}
                                    value={endDate}
                                    style={{ minWidth: '20px' }}
                                    type="date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col px-6"}>
                        <div className="text-base font-bold leading-relaxed text-coolGray-900">
                            Item List
                        </div>
                        {cart.map((x, i) => (
                            <ChartItem del={() => { del(i) }} sub={() => { sub(i) }} add={() => { add(i) }} key={i} data={x} />
                        ))}
                    </div>
                    {addrs ? (<Address data={addrs} onEdit={() => { location.href = '/m/my-address-mobile' }} />) : (
                        <span onClick={() => { location.href = '/m/my-address-mobile' }} className="flex justify-center items-center"> select address first </span>
                    )}
                    <SelectBox header="Payment Method" icon={<img style={{ width: '3rem' }} src="/fimgs/262_242.x3.png" />} title={allPayment.length > 0?allPayment[paymentSwitch].nama:"none"} onEdit={() => { setPaymentPop(true) }} />
                    <SelectBox header="Choose Shipping" icon={allShipping[shippingSwitch].icon} title={allShipping[shippingSwitch].name} onEdit={() => { setShippingPop(true) }} />


                    <div className="flex self-stretch flex-col space-y-4 items-start justify-start px-6">
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
                                    Rp{numberWithCommas(price.price)}
                                </div>
                            </div>
                            <div className="flex self-stretch space-x-4 items-start justify-between">
                                <div className="text-sm leading-snug text-coolGray-900">
                                    Shipping Total
                                </div>
                                <div className="text-sm leading-snug text-right text-coolGray-900">
                                    Rp{numberWithCommas(allShipping[shippingSwitch].cost)}
                                </div>
                            </div>
                            <div className="flex self-stretch space-x-4 items-start justify-between">
                                <div className="text-sm leading-snug text-coolGray-900">
                                    Admin Cost
                                </div>
                                <div className="text-sm leading-snug text-right text-coolGray-900">
                                    Rp{allPayment.length>0?numberWithCommas(allPayment[paymentSwitch].biaya_admin):"0"}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <Address data={x} /> */}
                </div>
                <PriceBox btnClick={() => { checkoutE() }} total_item={price.qty} total_harga={price.price + (allPayment.length>0?allPayment[paymentSwitch].biaya_admin:0) + (allShipping[shippingSwitch].cost)} btn_title="Checkout" />
            </div>







            <Popup onPopupClose={() => { setPaymentPop(false) }} opened={paymentPop} className="demo-popup-swipe" swipeToClose>
                <div style={{ height: '100%' }} className="flex flex-col">
                    <Tab mode={2} onBack={() => { setPaymentPop(false) }} />

                    <div
                        className="flex flex-col justify-content-center align-items-center h-full"
                    >

                        <div className="px-6 w-full flex-1">
                            <div className="text-xl font-bold text-coolGray-900" style={{ paddingBottom: '1rem' }}>
                                Transfer Bank
                            </div>
                            {allPayment.map((x, i) => (
                                <PaymentItem key={i} title={x.nama} gray={paymentSwitch == i} onClick={() => { setPaymentSwitch(i) }} />
                            ))}

                        </div>
                        <BottomBox total_harga={allPayment.length>0?allPayment[paymentSwitch].biaya_admin:"0"} btnClick={() => { setPaymentPop(false) }} />
                    </div>
                </div>
            </Popup>

            <Popup onPopupClose={() => { setShippingPop(false) }} opened={shippingPop} className="demo-popup-swipe" swipeToClose>
                <div style={{ height: '100%' }} className="flex flex-col">
                    <Tab mode={2} onBack={() => { setShippingPop(false) }} />

                    <div
                        className="flex flex-col justify-content-center align-items-center h-full"
                    >

                        <div className="px-6 w-full flex-1">
                            <div className="text-xl font-bold text-coolGray-900" style={{ paddingBottom: '1rem' }}>
                                Shipping Methode
                            </div>
                            {allShipping.map((x, i) => (
                                <ShipingItem icon={x.icon} key={i} title={x.name} gray={shippingSwitch == i} onClick={() => { setShippingSwitch(i) }} />
                            ))}

                        </div>
                        <BottomBox total_harga={allShipping[shippingSwitch].cost} btnClick={() => { setShippingPop(false) }} />
                    </div>
                </div>
            </Popup>

        </>
    );
}