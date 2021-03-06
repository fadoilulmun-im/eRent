/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Page, Swiper, SwiperSlide, Block, Sheet, PageContent } from 'framework7-react';
import { useState, useEffect } from "react";
import Tab from "./Tab";
import Home from "./home";
import { motion } from "framer-motion";

// import Notif from "./notif";
import Loding from "./loding";
import NewAddress from "./newAddress";
import Address from "./comp/address";
import { api } from "web.utils/src/api";


const AllAddr = (props) => {

    return (
        <div className="flex self-stretch flex-col  flex-grow items-start justify-start h-full overflow-y-auto">

            <div className="h-full overflow-y-auto flex flex-col space-y-5 w-full">
                <span className="px-6 font-bold text-2xl">My Address</span>
                <div className="flex flex-col w-full pb-10 ">
                    {props.addrs.map((x, i) => (
                        <Address onClick={()=>{props.onSwitch(x.id)}} gray={(props.switch==x.id)} onEdit={() => { props.onEdit(i) }} data={x} key={i} />
                    ))}

                </div>
            </div>
            <div
                className="p-6 bg-white shadow w-full flex space-x-2 justify-end"
                style={{ boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)', zIndex: 10 }}
            >

                <button onClick={() => { props.onNewAddr() }} className="bg-blue-700 rounded-md py-3 px-5 text-base font-medium  text-white" >Add New Address</button>

            </div>
        </div>
    )
}

export default () => {
    //const _component = useComponent("btn","/app/web/src/components/test",{});
    const [user, setUser] = useState({alamat_utama:0,id:0})
    const [state, setState] = useState(0);
    const [swiper, setSwiper] = useState({ slideTo: (e) => { } });
    const [loding, setLoding] = useState(true);

    const [allAddr, setAllAddr] = useState([]);
    const [addrIdx, setAddrIdx] = useState(0);

    const [editAddr, setEditAddr] = useState(null);

    useEffect(() => {
        let uu = localStorage.getItem('user')
        if (uu) {
          let u =JSON.parse(uu) 
          setUser(u)
          getAllAddr(u.id);
        } else {
            location.href = '/m/'
        }

        setLoding(false);
    }, [])

    const getAllAddr = (uid) => {
        api(`/api/customer/${uid}/list-alamat`).then((e) => {
            console.log(e);
            setAllAddr(e.data);

            if(user.alamat_utama){
                setAddrIdx(user.alamat_utama);                
            }
            //console.log(e.data);
        })
    }

    const onAddrEdit = (idx) => {
        setEditAddr(allAddr[idx]);
        console.log(allAddr[idx]);
        setState(1);
        swiper.slideTo(1);
    }


    const onBack = () => {
        if (state == 1) {
            setState(0);
            swiper.slideTo(0);
            getAllAddr(user['id']);
            setEditAddr(null);
        } else {
            history.back();
        }
    }
    const onNewAddr = () => {
        setEditAddr(null);
        setState(1);
        swiper.slideTo(1);
    }

    const onSwitch = (e)=>{
        setAddrIdx(e);
        console.log("eee",e)
        api(`/api/customer/${user.id}/alamat-utama/${e}`).then((i)=>{
            console.log(i);
            if(i.status == 'SUCCESS'){
                setUser(i.data);
                localStorage.setItem('user',JSON.stringify(i.data));
            }
        })
    }

    return (

        <Page >
            {/* <Notif /> */}
            <Loding state={loding} />
            <div className="h-screen flex flex-col bg-white">
                <div className="">
                    <Tab mode={2} onBack={() => { onBack() }} />
                </div>
                <div className="flex-1 overflow-y-auto" >
                    <Swiper allowTouchMove={false} style={{ height: '100%' }} onSwiper={setSwiper} onSlideChange={(e) => { setState(e.activeIndex) }}>
                        <SwiperSlide style={{ height: '100%' }}>
                            <div className="h-full">
                                <AllAddr onSwitch={onSwitch} switch={addrIdx} onEdit={(e) => { onAddrEdit(e) }} addrs={allAddr} onNewAddr={() => { onNewAddr() }} />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ height: '100%   ' }}>
                            <div className="h-full">
                                <NewAddress addr={editAddr} onSave={() => { onBack() }} onCancel={() => { onBack() }} />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>


        </Page>

    )
}