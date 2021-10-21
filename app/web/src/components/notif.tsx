/** @jsx jsx */
import { jsx} from "@emotion/react";
import { useComponent } from "web.utils/component";
import React, {useState} from "react";
import { motion } from "framer-motion"


export default (props) => {
  //const _component = useComponent("notif","/app/web/src/components/notif",{props});
  //const [state, setstate] = useState(0);
  return (<motion.div animate={{y: props.state?0:-150}} initial={{y:-150}} className=" z-10 rounded-md z-10 items-center text-white bg-blue-500 flex fixed p-5 justify-between" style={{
    top:"3rem",
    left:"1rem",
    right:"1rem",
  }}>
    <span>{props.msg}</span>
    <span className=" border border-white rounded-md p-3">
    <button onClick={()=>{props.click()}}>Close</button>
    </span>
  </motion.div>
  );
}