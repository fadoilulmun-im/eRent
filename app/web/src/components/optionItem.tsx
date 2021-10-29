/** @jsx jsx */
import { jsx } from "@emotion/react";
import { motion } from "framer-motion";
import { useState } from "react";

const Item = (props) => {
  // const _component = useComponent("option-item","/app/web/src/components/option-item",{ props });
  // return eval(_component.render)
  return (
    <span className="m-1">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          props.changeSwitch(props.value);
        }}
        style={{ borderRadius: '2rem', display: 'inline' }}
        className={
          "text-sm text-coolGray-900 text-center inline px-5 py-2 bg-white shadow border transition-all " +
          (props.switch == props.value ? "border-blue-700" : "border-gray-300")
        }
      >
        {props.name}
      </motion.button>
    </span>
  )
}

export default (props) => {
  const [state, setstate] = useState(0);
  return (
    <div className="w-full flex flex-wrap">
      {props.items.map((x, i) => (
        <Item
          key={i}
          value={i}
          switch={state}
          changeSwitch={(e) => {
            setstate(e);
            props.onSwitch?props.onSwitch(e):"";
          }}
          name={x} />
      ))}
    </div>

  )
}


