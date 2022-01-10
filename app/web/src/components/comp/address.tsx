/** @jsx jsx */
//import { jsx } from "@emotion/react";
// import { useEffect } from "react"

export default (props) => {

  return (
    <div  className={(props.gray? 'bg-gray-100':'')+" transition-all flex self-stretch flex-col space-y-4 items-start justify-start px-6 py-2"}>
      <div className="flex self-stretch space-x-4 items-center justify-between">
        <div className="text-base font-semibold leading-relaxed text-coolGray-900">
          {props.title?props.title:(props.data.kategori_alamat != '' ? props.data.kategori_alamat : "No titel")}
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
          {props.data.nama != '' ? props.data.nama : "No Name"} - {props.data.no_hp != '' ? props.data.no_hp : "000XXX"}
          <br />
          {props.data.alamat_pengiriman}
          <br />
          {props.data.kota} - {props.data.kecamatan}, {props.data.provinsi}
        </div>
      </div>
    </div>
  )
}