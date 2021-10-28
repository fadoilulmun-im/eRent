

export default (props)=>{
    return (<div className="flex flex-col rounded overflow-hidden overflow-hidde">
    <a
      className="block"
      style={{padding:'0px',margin:'0px'}}
      href={`/m/product-detail-mobile/${props.id}`}
    >
      <div className="bg-gray-100 p-4">
        <img src={props.img} />
        
      </div>
      <div className="bg-white px-4 py-3 space-y-1">
        <div className="text-xs font-medium leading-tight text-coolGray-900">
          {props.title}
        </div>
        <div className="text-sm font-bold leading-snug text-coolGray-900">
          Rp {props.harga ? props.harga : "kosong"}
        </div>
      </div>
    </a>
  </div>)
}