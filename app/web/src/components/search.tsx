import ItemBox from './comp/ItemBox';
//import eventBus from './Event/EventBus';
import {eventBus} from "../global"
import { useState,useEffect } from 'react';
import { api } from 'web.utils/src/api';
export default () => {
    const [barangs,setBarangs] = useState([]);
    const [pageN,setPageN] = useState(0);
    useEffect(()=>{
        // api('/api/barang?perPage='+pageN).then(e=>{
        //     console.log(e);
        // })
        eventBus.on('bottom',()=>{
            console.log('aad item')
        })
    },[])
    return (
        <div className="flex flex-col  flex-grow space-y-7 items-start justify-start"
            style={{ paddingBottom: '3rem' }}>
            <div className="flex flex-col space-y-4 items-start justify-start mb-2 w-full">
                <div className="text-3xl font-bold text-coolGray-900 px-6 flex justify-between w-full">
                    <span>Product</span>
                    <button
                        onClick={() => {
                            console.log("yeah");
                            eventBus.dispatch("filter",{message:"on"})
                        }}
                        style={{ width: '2rem', height: '2rem' }}
                    >
                        <img src="/fimgs/308_3875.x1.svg" />
                    </button>

                </div>
                <div className="flex w-full px-6">
                    <div className=" flex w-full bg-gray-100 px-3 py-2 rounded">
                        <input
                            placeholder="Search"
                            className="w-full bg-transparent"
                        />
                        <img src="/fimgs/I308_1998_157_91.x1.svg" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4 items-start justify-start w-full">
                <div className="grid grid-cols-2 gap-3 w-full px-6">
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                </div>
            </div>
        </div>
    )
}