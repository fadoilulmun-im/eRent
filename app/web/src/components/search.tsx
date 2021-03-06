import ItemBox from './comp/ItemBox';
//import eventBus from './Event/EventBus';
import { eventBus } from "../global"
import { useState, useEffect } from 'react';
import { api } from 'web.utils/src/api';
import { Page } from 'framework7-react';
import Tab from './Tab';
import Loding from './loding';
import Filter from './comp/filter';
export default (props) => {
    const [barangs, setBarangs] = useState([]);
    const [pageN, setPageN] = useState(0);
    const [loding, setLoding] = useState(true);
    const [keyword, setKeyword] = useState('');

    const [empty, setEmpty] = useState(true);
    const [canShowMore, setCanShowMore] = useState(false);

    const sortByItem = [{name:"A-Z", qry:"nama_barang ASC"},{name:"New Product",qry:"created_at DESC"}, {name:"Most Expensive",qry:"harga_barang DESC"}, {name:"Cheapest",qry:"harga_barang ASC"}];
    const [sortBy, setSortBy] = useState(0);

    const [categoryItem,setCategoryItem] = useState(["All", "Monitor", "Laptop", "Keyboard", "Mouse", "Projector", "Camera"]);
    const [category, setCategory] = useState(0);

    useEffect(() => {
        setKeyword(props.keyword);

        getBarang(props.keyword, 0,category,sortByItem[sortBy].qry);
        api("/api/list-kategori").then((e)=>{
            console.log("kategori",e);
            if(e.status == "SUCCESS"){
                setCategoryItem(["All",...e.data]);
            }
            setLoding(false);
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
        if (e.code == 'Enter') {
            getBarang(keyword, 0,category,sortByItem[sortBy].qry);
        }
    }
    const endScroll = (e) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;
        if (bottom) {
            getBarang(keyword, pageN+1,category,sortByItem[sortBy].qry,true);
            setPageN(pageN + 1);

        }
    }

    return (
        <Page>
            <Loding state={loding} />
            <div className={"h-screen bg-white flex-col " + (loding ? "hidden" : "flex")}>
                <div className="">
                    <Tab mode={0} />
                </div>
                <div onScroll={endScroll} className="flex flex-col  flex-grow space-y-7 items-start justify-start h-full overflow-y-auto"
                    style={{ paddingBottom: '3rem' }}>
                    <div className="flex flex-col space-y-4 items-start justify-start mb-2 w-full">
                        <div className="text-3xl font-bold text-coolGray-900 px-6 flex justify-between w-full">
                            <span>Search</span>
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
                    </div>
                    <div className="flex flex-col space-y-4 items-start justify-start w-full">
                        <div className="grid grid-cols-2 gap-3 w-full px-6">
                            {barangs.map((x: any, i) => (
                                <ItemBox key={i} id={x.id} title={x.nama_barang} harga={x.harga_barang} img={x.gambar_barang} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Filter show={()=>{getBarang(keyword, 0,category)}} onCategorySwitch={(e)=>{setCategory(e)}} />
             */}
             <Filter sortByItem = {sortByItem} sortBy={sortBy}  categoryItem={categoryItem} category={category} show={() => { getBarang(keyword, 0, category,sortByItem[sortBy].qry) }} onSortSwitch={(e) => { setSortBy(e)}} onCategorySwitch={(e) => { setCategory(e) }} />
        </Page>
    )
}