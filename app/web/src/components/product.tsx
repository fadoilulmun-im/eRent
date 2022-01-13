import ItemBox from './comp/ItemBox';
//import eventBus from './Event/EventBus';
import { eventBus } from "../global"
import { useState, useEffect } from 'react';
import { api } from 'web.utils/src/api';
import Filter from './comp/filter';
import StatusPill from './comp/statusPill';
import Skeleton from './comp/skeleton';

export default () => {
    const [barangs, setBarangs] = useState([]);
    const [pageN, setPageN] = useState(0);
    // const [loding, setLoding] = useState(true);
    const [keyword, setKeyword] = useState('');
    const sortByItem = [{name:"A-Z", qry:"nama_barang ASC"},{name:"New Product",qry:"created_at DESC"}, {name:"Most Expensive",qry:"harga_barang DESC"}, {name:"Cheapest",qry:"harga_barang ASC"}];
    const [sortBy, setSortBy] = useState(0);
    

    const [empty, setEmpty] = useState(true);
    // const [statusSwitch, setStatusSwitch] = useState(0);
    const [canShowMore, setCanShowMore] = useState(false);
    const [categoryItem,setCategoryItem] = useState(["All", "Monitor", "Laptop", "Keyboard", "Mouse", "Projector", "Camera"]);
    const [category, setCategory] = useState(0);

    useEffect(() => {
        getBarang(keyword, 0, null,sortByItem[sortBy].qry);
        api("/api/list-kategori").then((e)=>{
            console.log("kategori",e);
            if(e.status == "SUCCESS"){
                setCategoryItem(["All",...e.data]);
            }
        })
    }, [])

    const getBarang = (key, n, cat,sort,add: boolean = false) => {
        console.log(cat);
        setEmpty(false);
        api(`/api/barang?search=${key}&page=${n}&category=${cat ? cat : ''}&sortby=${sort}`).then((e) => {
            console.log(e);
            if (add) {
                setBarangs(barangs.concat(e.data))
            } else {
                setBarangs(e.data)
            }
            if (e.data.length < 10) {
                setCanShowMore(false)
            } else {
                setCanShowMore(true)
            }

            if (e.data.length > 0) {
                setEmpty(false);
            } else {
                setEmpty(true);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const onSearch = (e) => {
        // alert(e.code);
        if (e.code == 'Enter' || e.code == '') {
            getBarang(keyword, 0, category,sortByItem[sortBy].qry);
        }
    }
    const showMore = () => {
        getBarang(keyword, pageN + 1, category, true);
        setPageN(pageN + 1);


    }

    const renderItems = () => {

    }
    return (
        <div className="flex flex-col  flex-grow  items-start justify-start h-full overflow-y-auto"
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
                        {categoryItem.map((x, i) => (
                            <StatusPill key={i} onClick={() => { setCategory(i); getBarang(keyword, 0, i,sortByItem[sortBy].qry); }} active={category == i} title={x} />
                        ))}

                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4 items-start justify-start w-full">
                {empty ? (<div className='w-full flex justify-center'>Empty</div>) : (<div className="grid grid-cols-2 gap-3 w-full px-6">
                    {barangs.length > 0 ?

                        barangs.map((x: any, i) => (
                            <ItemBox key={i} id={x.id} title={x.nama_barang} harga={x.harga_barang} img={x.gambar_barang} />
                        ))

                        : Array.from({ length: 4 }, (item, index) => (
                            <div key={index} className="flex flex-col rounded overflow-hidden overflow-hidde">
                                <Skeleton style={{ minHeight: '7rem' }} />
                                <div className="bg-white px-4 py-3 space-y-1">
                                    <Skeleton style={{ minHeight: '1rem', width: '100%' }} />
                                    <Skeleton style={{ minHeight: '1rem', width: '80%' }} />
                                </div>
                            </div>))}
                </div>)}
                <div className="flex justify-center w-full">
                    {empty?"":(canShowMore ?
                        <span onClick={() => { showMore() }} className=" font-semibold py-3 px-5 text-gray-500 bg-gray-100 rounded-full">Show more</span>
                        : <span className="font-semibold text-gray-500">you’ve reached the end.</span>)
                    }

                </div>

            </div>
            <Filter sortByItem = {sortByItem} sortBy={sortBy}  categoryItem={categoryItem} category={category} show={() => { getBarang(keyword, 0, category,sortByItem[sortBy].qry) }} onSortSwitch={(e) => { setSortBy(e)}} onCategorySwitch={(e) => { setCategory(e) }} />
        </div>
    )
}