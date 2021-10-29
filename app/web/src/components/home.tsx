import React from 'react';
import ItemBox from './comp/ItemBox';
import { Page, Navbar, BlockTitle, Swiper, SwiperSlide, Block, } from 'framework7-react';
import { useState } from 'react';

export default () => {
    const [keyword,setKeyword] = useState('');
    const search = (e) => {
        if(e.code == 'Enter'){
            location.href = "/m/search-mobile/"+keyword
        }
    }
    return (
        <div className="flex self-stretch flex-col  flex-grow space-y-7 items-start justify-start overflow-auto"
            style={{ paddingBottom: '3rem' }}>
            <div className="flex flex-col space-y-4 items-start justify-start mb-2 w-full">
                <div className="text-3xl font-bold text-coolGray-900 px-6">
                    Discover More
                </div>
                <div className="flex w-full px-6">
                    <div className=" flex w-full bg-gray-100 px-3 py-2 rounded">
                        <input
                            placeholder="Search"
                            className="w-full bg-transparent"
                            value={keyword}
                            onChange={(e)=>{setKeyword(e.target.value)}}
                            onKeyPress={(e) => { search(e) }}
                        />
                        <img src="/fimgs/I308_1998_157_91.x1.svg" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4 items-start justify-start w-full">
                <div className="text-xl font-semibold text-coolGray-900 px-6">
                    New Arrival
                </div>
                <div className="grid grid-cols-2 gap-3 w-full px-6">
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                </div>
            </div>
            <div className="flex flex-col space-y-4 items-start justify-start w-full">
                <div className="text-xl font-semibold text-coolGray-900 px-6">
                    Recommend for you
                </div>
                <div className="grid grid-cols-2 gap-3 w-full px-6">
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                    <ItemBox id={12} title={"hell"} harga={100000} img={'/fimgs/232_297.x1.svg'} />
                </div>
            </div>

        </div>
    )
}