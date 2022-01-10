/** @jsx jsx */
//import { jsx } from "@emotion/react";
// import { useEffect } from "react"

export default (props) => {

  return (
    <div  className={(props.gray? 'bg-gray-100':'')+" transition-all flex self-stretch flex-col space-y-4 items-start justify-start px-6 py-2 "}>
      <div className="flex self-stretch space-x-4 items-center justify-between">
        <div className="text-base font-semibold leading-relaxed text-coolGray-900">
          {props.title?props.title:(props.data.kategori_alamat != '' ? props.data.kategori_alamat : "Tittle Adress Not Set")}
        </div>


        { props.canEdit?"":<a onClick={()=>{props.onEdit()}} className="text-xs font-bold leading-tight text-right text-coolGray-300">
          Change Address
        </a>}

      </div>
      <div onClick={()=>{props.onClick()}} className="flex self-stretch space-x-3 items-start justify-start">
        <div>
          <img src="/fimgs/262_233.x1.svg" />
        </div>
        <div className="text-sm leading-snug text-coolGray-900">
          {props.data.nama != '' ? props.data.nama : "Name Not Set"} - {props.data.no_hp != '' ? props.data.no_hp : "Number Not Set"}
          <br />
          {props.data.alamat_pengiriman != '' ? props.data.alamat_pengiriman : "Address Not Set"}
          <br />
          {props.data.kota != '' ? props.data.kota : "City"}, {props.data.kecamatan != '' ? props.data.kecamatan : "Subdistrict"}, {props.data.provinsi != '' ? props.data.provinsi : "and Province Not Set"}
        </div>
      </div>
    </div>
  )
}