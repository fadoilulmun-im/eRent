import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { api } from 'web.utils/src/api';
import { numberWithCommas } from '../global';
import Tab from './Tab';
import Loding from './loding';

const PriceBox = (props) => {
    return (
        <div
            className="flex self-stretch items-center justify-start px-6 py-4 bg-white shadow"
            style={{ boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)', zIndex: 10 }}
        >
            <div className="flex flex-1 space-x-4 items-center justify-start">
                <div className="flex flex-1 flex-col space-y-0.5 items-start justify-start">
                    <div className="text-base font-medium leading-relaxed text-coolGray-500">
                        total: {props.total_item} items
                    </div>
                    <div className="text-xl font-semibold text-coolGray-900">
                        Rp {props.total_harga ? numberWithCommas(props.total_harga) : 0}
                    </div>
                </div>
                <div className="flex items-center justify-end px-6 py-2 bg-blue-700 rounded">
                    <button
                        onClick={() => {
                            props.btnClick();
                        }}
                        className="text-base font-medium leading-relaxed text-center text-white"
                    >
                        {props.btn_title}
                    </button>
                </div>
            </div>
        </div>
    )
}

const Item = (props) => {
    const anim = useAnimation();

    const del = () => {
        anim.start({
            height: 0,
            opacity: 0,
        }).then((e) => {
            console.log("dell item");
            props.del();
        });
    }

    return (
        <motion.div animate={anim} style={{ overflowY: 'hidden' }}>
            <div className="flex my-2 self-stretch space-x-4 items-center justify-start bg-white">
                <div
                    className="bg-gray-100 p-4 rounded"
                    style={{ width: '9rem' }}
                >
                    <img src="/fimgs/232_297.x1.svg" />
                </div>
                <div className="flex flex-col space-y-3 items-start justify-start flex-grow">
                    <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                        <div className="text-base font-medium leading-relaxed text-coolGray-900">
                            {props.data.barang.nama_barang}
                        </div>
                        <div className="text-sm leading-snug text-coolGray-500">Rp {numberWithCommas(props.data.barang.harga_barang)}</div>
                    </div>
                    <div className="flex self-stretch items-center justify-between">
                        <div className="flex space-x-3 items-center justify-start">
                            <div className="flex justify-center">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        props.sub();
                                    }}
                                    className="flex items-start justify-start px-1 py-0 border rounded border-coolGray-500"
                                >
                                    -
                                </motion.button>
                            </div>
                            <div className="text-sm leading-snug text-center text-coolGray-500 px-4">
                                {props.data.quantity}
                            </div>
                            <div className="flex flex-col space-y-96 justify-center">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        props.add();
                                    }}
                                    className="flex items-start justify-start px-1 py-0 border rounded border-coolGray-500"
                                >
                                    +
                                </motion.button>
                            </div>
                        </div>
                        <div className="flex space-x-3 items-center justify-end">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    del();
                                }}
                            >
                                <img
                                    className={props.mode ? "hidden" : ""}
                                    // style="width: 18px; min-width: 18px; max-width: 18px; height: 20px; min-height: 20px; max-height: 20px;"
                                    src="/fimgs/214_464.x1.svg"
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default () => {

    const [cart, setCart] = useState<any>([]);

    const [user, setUser] = useState<any>({});

    const [delList, setDelList] = useState([]);

    const [price, setPrice] = useState({ price: 0, qty: 0 });

    const [loding,setLoding] = useState(true);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) {
            const uu = JSON.parse(u)
            setUser(uu);
            api(`/api/customer/${uu.id}/cart`).then((e) => {
                if (e.status == 'SUCCESS') {
                    console.log(e.data);
                    setCart(e.data);
                    count(e.data, delList);
                }
                setLoding(false);
            })
        } else {
            location.href = '/m/'
        }
    }, [])
    const count = (dt: any, dls: any) => {
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
        setPrice({ price: total, qty: qty });
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
    return (
        <>
            <Loding state={loding}/>
            <div className={(loding?"hidden":"flex")+" flex-col h-full"}>
                <Tab />
                <div className="h-full overflow-y-auto space-y-4">
                    <div className="text-3xl font-bold text-coolGray-900 px-6">Cart</div>
                    <div className={"flex flex-col px-6"}>
                        {cart.map((x, i) => (
                            <Item del={() => { del(i) }} sub={() => { sub(i) }} add={() => { add(i) }} key={i} data={x} />
                        ))}
                    </div>
                </div>
                {/* <SaveCancel /> */}
                <PriceBox btnClick={()=>{ location.href='/m/checkout-mobile'}} total_item={price.qty} total_harga={price.price} btn_title="Checkout" />
            </div>
        </>
    )

}