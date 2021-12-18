import React, { useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
import { api } from 'web.utils/src/api';
import { numberWithCommas } from '../global';
import Tab from './Tab';
import Loding from './loding';
import { eventBus } from '../global';

import ChartItem from './comp/chartItem';
import PriceBox from './comp/priceBox';

export default () => {

    const [cart, setCart] = useState<any>([]);

    const [user, setUser] = useState<any>({});

    const [delList, setDelList] = useState([]);

    const [price, setPrice] = useState({ price: 0, qty: 0 });

    const [loding,setLoding] = useState(true);

    const [canCheckout,setCanCheckout] = useState(true);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) {
            const uu = JSON.parse(u)
            setUser(uu);
            api(`/api/customer/${uu.id}/cart`).then((e) => {
                if (e.status == 'SUCCESS') {
                    // console.log(e.data);
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
        // console.log(total);
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
        // console.log(cart);
        
        let dt = [...cart] as any;
        if (dt[idx]['quantity'] > 1) {
            dt[idx]['quantity'] -= 1;
            //console.log(dt);
            setCart(dt);
            
            count(dt, delList);
            updateQty(dt[idx]);
        }
        // console.log(cart.length);
    }
    const del = (idx) => {
        // console.log(cart[idx]);
        //setCart(cart.filter((x:any,i) => x.barang.id != (cart[idx] as any).barang.id))
        let t: any = [...delList];
        t.push(idx);
        setDelList(t);
        count(cart, t);

        //apidel
        api(
            `/api/customer/${user.id}/delete-cart/${cart[idx].id}`
        ).then((e) => {
            console.log(cart.length);
            if(cart.length>delList.length){
                eventBus.dispatch('subCart',0);
            }
        });
        console.log(delList,"dl",cart)
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
                            <ChartItem del={() => { del(i) }} sub={() => { sub(i) }} add={() => { add(i) }} key={i} data={x} />
                        ))}
                    </div>
                </div>
                {/* <SaveCancel /> */}
                <PriceBox btn_disable={cart.length>delList.length?false:true} btnClick={()=>{ location.href='/m/checkout-mobile'}} total_item={price.qty} total_harga={price.price} btn_title="Checkout" />
            </div>
        </>
    )

}