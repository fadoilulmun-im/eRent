/** @jsx jsx */
import { jsx } from "@emotion/react";
import { motion } from "framer-motion"
import { useState } from "react";
//import { useComponent } from "web.utils/component";

export default (props) => {
  //const _component = useComponent("filter","/app/web/src/components/filter",{});
  //return eval(_component.render)
  const [sortByState, setSortByState] = useState(0);
  const [categoryState, setCategoryState] = useState(1);
  const sortby = [
    "New Product","Most Expensive","Cheapest","A-Z"
  ];
  const category = [
    "komputer","alat ajaib","monitor"
  ];

  return (<motion.div animate={{pointerEvents: props.state?"all":"none"}} style={{zIndex:15}} className={" z-10 fixed w-screen h-screen overflow-hidden"}>
    <motion.div transition={{ type: "easeInOut", }} animate={{y:props.state?1:'100%'}} style={{zIndex:15}} className={" flex flex-col space-y-4 fixed bottom-0 right-0 left-0 bg-white  p-6 pb-8 rounded-t-lg"}>
      <div className="text-xl font-semibold text-coolGray-900 pb-2">Filter</div>
      <div className=" flex flex-col space-y-2">
        <span className="text-base font-medium text-coolGray-900">Sort by</span>
        <div className="w-full flex flex-wrap">
          {sortby.map((x,i)=>(
                      <span className="m-1" key={i}>
                      <button onClick={()=>{setSortByState(i)}} className={" rounded-full text-sm text-coolGray-900 text-center inline px-5 py-2 bg-white shadow border " +
                                      (i == sortByState ? "border-blue-700" : "border-gray-300")}>
                        {x}
                      </button>
                  </span>
          ))}

        </div>
      </div>
      <div className=" flex flex-col space-y-2">
        <span className="text-base font-medium text-coolGray-900">Category</span>
        <div className="w-full flex flex-wrap">
          {category.map((x,i)=>(
                      <span className="m-1" key={i}>
                      <button onClick={()=>{setCategoryState(i)}} className={" rounded-full text-sm text-coolGray-900 text-center inline px-5 py-2 bg-white shadow border " +
                                      (i == categoryState ? "border-blue-700" : "border-gray-300")}>
                        {x}
                      </button>
                  </span>
          ))}

        </div>
      </div>
      <button className=" mt-3 flex self-stretch text-white font-medium justify-center px-6 py-2 text-base bg-blue-700 rounded">Show</button>
    </motion.div>
    <motion.div onClick={()=>{props.onBgClick()}} animate={{opacity: props.state? 0.5:0}} className={"fixed w-screen h-screen bg-black"} ></motion.div>
  </motion.div>)
}