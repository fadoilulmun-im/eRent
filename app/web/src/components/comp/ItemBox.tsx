import { motion } from "framer-motion"
import {numberWithCommas} from "../../global";

export default (props) => {
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
    onClick={() => {
      console.log("click");
      location.href="/m/product-detail-mobile/"+props.id
    }} whileTap={{ scale: 0.95 }} 
    className="flex flex-col rounded overflow-hidden overflow-hidde"
    style={props.style?props.style:""}
    >
      <div className="bg-gray-100 p-4 " style={{ minHeight: '5rem' }}>
        <img src={props.img} />
      </div>
      <div className="bg-white px-4 py-3 space-y-1">
        <div className="text-xs font-medium leading-tight text-coolGray-900">
          {props.title}
        </div>
        <div className="text-sm font-bold leading-snug text-coolGray-900">
          Rp {props.harga ? numberWithCommas(props.harga) : "kosong"}
        </div>
      </div>
    </motion.div>)
}