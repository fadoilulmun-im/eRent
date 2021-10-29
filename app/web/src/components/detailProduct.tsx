import Tab from "./Tab"
import { eventBus } from "../global"
import { useState, useEffect } from 'react'
import OptionItem from "./optionItem"
import { api } from "web.utils/src/api"
import { numberWithCommas } from '../global'
const RentNow = () => {
  return (
    <div
      className="flex self-stretch justify-start px-6 py-4 bg-white shadow items-center"
      style={{ boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)', zIndex: 10 }}
    >
      <div className="flex flex-1 space-x-4 items-center justify-start">
        <div className="flex flex-1 flex-col space-y-0.5 items-start justify-start">
          <button
            onClick={() => {
              eventBus.dispatch("cart", { type: 0 })
            }}
            className="flex items-center"
            style={{ width: '2rem', height: '3rem' }}
          >
            <img src="/fimgs/259_239.x1.svg" />
          </button>
        </div>
        <div className="flex items-center justify-end px-6 py-2 bg-blue-700 rounded">
          <button className="text-base font-medium leading-relaxed text-center text-white">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ({ id }) => {
  const [barang, setBarang] = useState({});
  useEffect(() => {
    api(`/api/barang/show/${id ? id : 1}`).then((e) => {
      console.log(e);
      setBarang(e.data);
    });
    api("/api/barang?perPage=" + 4).then((e) => {
      console.log(e);
    });
  }, [])
  return (
    <div
      className={
        `flex-col items-start justify-start h-screen w-full bg-white flex`
      }
    >
      {/*notif and chart button*/}
      {/* <top-naviagation mode={3} /> */}
      <Tab mode={3} />
      <div className="flex self-stretch flex-col items-start justify-start overflow-auto">
        <img
          src="/fimgs/232_297.x1.svg"
          className="flex self-stretch flex-col items-start justify-start px-4 py-3 bg-gray-100"
        />
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
          <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
            <div className="text-base font-bold leading-relaxed text-coolGray-900">
              Options
            </div>
            <OptionItem items={["pink", "blue", "yellow"]} />
          </div>
          {/* */}

          <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
            <div className="text-base font-bold leading-relaxed text-coolGray-900">
              About
            </div>
            <div className="text-sm leading-snug text-coolGray-900">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum
              cursus auctor egestas nibh aliquet lectus. Fermentum imperdiet mi,
              aliquet vitae. Amet eros vitae consectetur leo. Ante egestas ac in
              blandit. Ultricies pellentesque in ultrices augue orci
              scelerisque.
            </div>
          </div>
          <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
            <div className="text-base font-bold leading-relaxed text-coolGray-900">
              Related Product
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* {meta.barangs.map((x, i) => (
                  <box-item2
                    title={x.nama_barang}
                    harga={x.harga_barang}
                    img={"/fimgs/232_297.x1.svg"}
                    id={x.id}
                  />
                ))} */}
            </div>
          </div>
        </div>
      </div>
      <RentNow />
      {/* <rent-now
          id={params.id}
          onSucess={(e) => {
            meta.notif_msg = e.message;
            meta.notif_state = true;
          }}
        /> */}
    </div>
  )
}