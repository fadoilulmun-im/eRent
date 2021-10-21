/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";
import { motion } from "framer-motion"

export default (props) => {
  //const _component = useComponent("loding","/app/web/src/components/loding",{});
  return (
    <motion.div style={{zIndex: 12}} className=" flex fixed w-screen h-screen bg-white justify-center items-center"
    animate={{opacity: props.state? 1:0,pointerEvents:  props.state?'all':'none',}}
    >
      <div className={" flex flex-col justify-center items-center space-y-2"}>
      {/* <motion.img animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 2, repeat: Infinity }} src="/fimgs/308_231.x1.svg" />
       */}
      <motion.div
      animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 2, repeat: Infinity }}
      >
      <svg width="60" height="59" viewBox="0 0 60 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M58.025 29.5C58.8396 29.5 59.5038 28.8391 59.4631 28.0255C59.1644 22.0549 57.0573 16.3027 53.4039 11.5415C49.4507 6.38953 43.9078 2.68595 37.6352 1.00519C31.3625 -0.675572 24.7105 -0.239577 18.7108 2.24555C12.7112 4.73068 7.69923 9.12607 4.45225 14.75C1.20527 20.3739 -0.0952551 26.9121 0.752376 33.3505C1.60001 39.7889 4.54843 45.7677 9.14035 50.3596C13.7323 54.9516 19.7111 57.9 26.1495 58.7476C32.0994 59.5309 38.1345 58.4797 43.4546 55.7531C44.1796 55.3815 44.4198 54.4758 44.0125 53.7704V53.7704C43.6052 53.0649 42.7047 52.8272 41.9777 53.1947C37.2218 55.5989 31.8405 56.5214 26.5345 55.8229C20.74 55.06 15.359 52.4064 11.2263 48.2737C7.09358 44.141 4.44001 38.76 3.67714 32.9655C2.91427 27.1709 4.08474 21.2865 7.00703 16.225C9.92931 11.1635 14.4401 7.20762 19.8398 4.971C25.2394 2.73438 31.2262 2.34199 36.8716 3.85467C42.5171 5.36735 47.5056 8.70058 51.0635 13.3374C54.3215 17.5832 56.2132 22.7048 56.509 28.0257C56.5543 28.839 57.2104 29.5 58.025 29.5V29.5Z" fill="#2A59D8"/>
</svg>

      </motion.div>
      <span>please wait...</span></div>
    </motion.div>
  )
}