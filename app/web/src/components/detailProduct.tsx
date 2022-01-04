import Tab from "./Tab"
import { eventBus } from "../global"
import { useState, useEffect } from 'react'
import OptionItem from "./optionItem"
import { api } from "web.utils/src/api"
import { numberWithCommas } from '../global'
import { Page } from 'framework7-react';
import Loding from "./loding"
import { motion } from "framer-motion"
import ItemBox from './comp/ItemBox';
import Image from './comp/image';



const RentNow = (props) => {
  return (
    <div
      className="flex self-stretch justify-start px-6 py-4 bg-white shadow items-center"
      style={{ boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)', zIndex: 10 }}
    >
      <div className="flex flex-1 space-x-4 items-center justify-start">
        <div className="flex flex-1 flex-col space-y-0.5 items-start justify-start">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              props.onAdd()
            }}
            className="flex items-center"
            style={{ width: '2rem', height: '3rem' }}
          >
            <img src="/fimgs/259_239.x1.svg" />
          </motion.button>
        </div>
        <div className="flex items-center justify-end px-6 py-2 bg-blue-700 rounded">
          <button onClick={props.onRentNow} className="text-base font-medium leading-relaxed text-center text-white">
            {props.isLoding ? "Loding.." : "Rent Now"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ({ id }) => {
  const [barang, setBarang] = useState({});
  const [loding, setLoding] = useState(true);
  const [user, setUser] = useState(null);

  const [otherItems, setOtherItems] = useState<any>([]);

  const [rentNowLoding, setRentNowLoding] = useState(false);

  useEffect(() => {
    api(`/api/barang/show/${id ? id : 1}`).then((e) => {
      console.log(e);
      setBarang(e.data);
      if (e.data.kategori_barang) {
        api(`/api/barang?perPage=${4}&category=${e.data.kategori_barang}`).then((e) => {
          console.log('ada', e);
          setOtherItems(e.data);
        });
      }
      setLoding(false);

    });
    let uu = localStorage.getItem('user')
    if (uu) {
      setUser(JSON.parse(uu))
    }

  }, [])
  const add = () => {
    console.log(user);
    if (user) {
      api(`/api/customer/${user['id']}/add-cart`, { id_barang: id, quantity: 1 }).then((e) => {
        eventBus.dispatch("cart", { type: 0 })
        console.log(e);
      })
    } else {
      eventBus.dispatch("notif", { message: "you must login first" })
    }
  }
  const rentNow = () => {
    if (user) {

      api(`/api/customer/${user['id']}/add-cart`, { id_barang: id, quantity: 1 }).then((e) => {
        // eventBus.dispatch("cart", { type: 0 })
        if (e.status == "SUCCESS") {
          eventBus.dispatch("cart", { type: 0 })
          location.href = '/m/cart-mobile'
        }

      })
    } else {
      eventBus.dispatch("notif", { message: "you must login first" })
    }
  }
  return (
    <Page >
      <Loding />

      <div
        className={
          `flex-col items-start justify-start h-screen w-full bg-white ${loding ? 'hidden' : 'flex'}`
        }
      >
        {/*notif and chart button*/}
        {/* <top-naviagation mode={3} /> */}
        <Tab mode={3} />
        <div className="flex self-stretch flex-col h-full items-start justify-start overflow-auto">
          <div style={{minHeight:'15rem'}} className=" overflow-x-hidden flex self-stretch flex-col items-center justify-center px-4 py-3 bg-gray-100">
            <span className="p-10"><Image src={barang['gambar_barang']}/></span>
          </div>
          <div className="flex self-stretch flex-col space-y-6 items-start justify-start px-6 pt-4">
            <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
              <div className="text-xl text-coolGray-900">
                {/* {meta.barang.nama_barang} */}
                {barang['nama_barang']}
              </div>
              <div className="flex self-stretch space-x-4 items-center justify-between">
                <div className="text-2xl font-semibold">
                  Rp {barang['harga_barang'] ? numberWithCommas(barang['harga_barang']) : "0"}
                  {/* {meta.barang.harga_barang
                    ? numberWithCommas(meta.barang.harga_barang)
                    : "0"} */}
                </div>
                <div className="text-sm leading-snug text-right text-coolGray-500">
                  {/* stock: {meta.barang.stok_barang} */}
                  stock: {barang['stok_barang']}
                </div>
              </div>
            </div>

            {/* option */}
            {/* <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
              <div className="text-base font-bold leading-relaxed text-coolGray-900">
                Options
              </div>
              <OptionItem items={["pink", "blue", "yellow"]} />
            </div> */}
            {/* */}

            <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
              <div className="text-base font-bold leading-relaxed text-coolGray-900">
                Detail Product
              </div>
              <div className=" font-medium leading-snug text-coolGray-900 flex justify-between w-full">
                <span>Wight</span>
                <span>{barang['berat_barang'] ? barang['berat_barang'] : "None"} Kg</span>
              </div>
            </div>
            <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
              <div className="text-base font-bold leading-relaxed text-coolGray-900">
                About
              </div>
              <div className="text-sm leading-snug text-coolGray-900">
                {barang['detail_barang'] ? barang['detail_barang'] : "No description"}
              </div>
            </div>
            <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
              <div className="text-base font-bold leading-relaxed text-coolGray-900">
                Related Product
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {otherItems.map((x, i) => (
                  <ItemBox key={i} id={x.id} title={x.nama_barang} harga={x.harga_barang} img={x.gambar_barang} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <RentNow isLoding={rentNowLoding} onAdd={() => { add() }} onRentNow={() => { rentNow(); setRentNowLoding(true) }} />
        {/* <rent-now
          id={params.id}
          onSucess={(e) => {
            meta.notif_msg = e.message;
            meta.notif_state = true;
          }}
        /> */}
      </div>
    </Page >
  )
}