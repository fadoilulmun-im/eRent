/** @jsx jsx */
import { jsx} from "@emotion/react";
import { useComponent } from "web.utils/component";
import React, {useState, useEffect} from "react";
import { motion } from "framer-motion"
import {eventBus} from "../global"

export default (props) => {
  //const _component = useComponent("notif","/app/web/src/components/notif",{props});

  const [state, setState] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(()=>{
    eventBus.on('notif',(e)=>{
      console.log("notif",e.message);
      setMessage(e.message);
      setState(true);
    });
  })


  return (<motion.div animate={{y: state?0:-150}} initial={{y:-150}} className="rounded-md z-10 items-center text-white bg-blue-500 flex fixed p-5 justify-between" style={{
    top:"3rem",
    left:"1rem",
    right:"1rem",
  }}>
    <span>
      {message}
    </span>
    <span className=" border border-white rounded-md p-3">
    <button onClick={()=>{setState(false)}}>Close</button>
    </span>
  </motion.div>
  );
}