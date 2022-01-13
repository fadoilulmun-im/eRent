// /** @jsx jsx */
// import { jsx } from "@emotion/react";
// import { useComponent } from "web.utils/component";
import { useState } from "react"



const WindowBox = (props) => {
  const [open,setOpen] = useState(true);
  return (
    <div className="p-4">
      <div className="w-full flex-col bg-white flex rounded border shadow">
        {/* head */}
        <div className="flex justify-between items-center px-3 py-1 border-b flex-1">
          <span className=" font-bold">{props.title||"No Title"}</span>
          <div>
            <button className="p-1" onClick={()=>{setOpen(!open)}}>
              <svg transform={open?'':'rotate(180)'} width={'2rem'} height={'2rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z" /></svg>
            </button>
            <button className="p-1">
              <svg width={'2rem'} height={'2rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" /></svg>
            </button>
          </div>
        </div>
        <div style={{height:open?'':'0px'}} className="overflow-y-hidden">
          <div className=" p-3">
            {props.children || "empty"}
          </div>
        </div>


      </div>
    </div>
  )
}

export default (props) => {
  // const [isError, setIsError] = useState(false);
  return (
    <div className=" w-screen h-screen flex justify-center">
      <div className=" w-full flex justify-center p-2 bg-gray-100">

        <div className="flex-1">
          {/* kotak */}
          <WindowBox >
            <span>aaa</span>
          </WindowBox>
          <WindowBox />
          <WindowBox />
        </div>

        <div className="p-2 flex-1">as</div>
      </div>
    </div>
  )
}