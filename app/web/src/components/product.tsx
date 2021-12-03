import ItemBox from './comp/ItemBox';
//import eventBus from './Event/EventBus';
import { eventBus } from "../global"
import { useState, useEffect } from 'react';
import { api } from 'web.utils/src/api';
import Filter from './comp/filter';
import StatusPill from './comp/statusPill';

export default () => {
    const [barangs, setBarangs] = useState([]);
    const [pageN, setPageN] = useState(0);
    // const [loding, setLoding] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState(null);

    const [statusSwitch, setStatusSwitch] = useState(0);
    const status = [
        "All Orders", "Cancelled",
        "Completed", "On Return",
        "Arrived", "On The Way",
        "Packed", "Waiting for Confirmation",
        "Pending"]

    useEffect(() => {
        getBarang(keyword, 0, null);
    }, [])
    const getBarang = (key, n, cat, add: boolean = false) => {
        console.log(cat);
        api(`/api/barang?search=${key}&page=${n}&category=${cat ? cat : ''}`).then((e) => {
            console.log(e);
            if (add) {
                setBarangs(barangs.concat(e.data))
            } else {
                setBarangs(e.data)
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const onSearch = (e) => {
        // alert(e.code);
        if (e.code == 'Enter' || e.code == '') {
            getBarang(keyword, 0, category);
        }
    }
    const endScroll = (e) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;
        if (bottom) {
            getBarang(keyword, pageN + 1, category, true);
            setPageN(pageN + 1);

        }
    }
    return (
        <div onScroll={endScroll} className="flex flex-col  flex-grow space-y-7 items-start justify-start h-full overflow-y-auto"
            style={{ paddingBottom: '3rem' }}>
            <div className="flex flex-col space-y-4 items-start justify-start mb-2 w-full">
                <div className="text-3xl font-bold text-coolGray-900 px-6 flex justify-between w-full">
                    <span>Product</span>
                    <button
                        onClick={() => {
                            console.log("yeah");
                            eventBus.dispatch("filter", { message: "on" })
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
                            value={keyword}
                            onChange={(e) => { setKeyword(e.target.value) }}
                            onKeyPress={(e) => { onSearch(e) }}
                        />
                        <img src="/fimgs/I308_1998_157_91.x1.svg" />
                    </div>
                </div>

                <div className="w-full flex justify-start overflow-x-auto py-2" style={{ height: '4.5rem' }}>
                    <div className="px-6 flex space-x-3" style={{ paddingBottom: '1rem' }}>
                        {status.map((x, i) => (
                            <StatusPill key={i} onClick={() => { setStatusSwitch(i) }} active={statusSwitch == i} title={x} />
                        ))}

                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4 items-start justify-start w-full">
                <div className="grid grid-cols-2 gap-3 w-full px-6">
                    {barangs.map((x: any, i) => (
                        <ItemBox key={i} id={x.id} title={x.nama_barang} harga={x.harga_barang} img={'/fimgs/232_297.x1.svg'} />
                    ))}
                </div>
            </div>
            <Filter show={() => { getBarang(keyword, 0, category) }} onSortSwitch={(e) => { }} onCategorySwitch={(e) => { setCategory(e) }} />
        </div>
    )
}