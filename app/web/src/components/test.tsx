// /** @jsx jsx */
// import { jsx } from "@emotion/react";
// import { useComponent } from "web.utils/component";
import { useState } from "react"
import Tab from './Tab';



const WindowBox = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-4">
      <div className="w-full flex-col bg-white flex rounded border shadow">
        {/* head */}
        <div className="flex justify-between items-center px-3 py-1 border-b flex-1">
          <span className=" font-bold">{props.title || "No Title"}</span>
          <div>
            <button className="p-1" onClick={() => { setOpen(!open) }}>
              <svg transform={open ? '' : 'rotate(180)'} width={'2rem'} height={'2rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z" /></svg>
            </button>
            <button className="p-1">
              <svg width={'2rem'} height={'2rem'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" /></svg>
            </button>
          </div>
        </div>
        <div style={{ height: open ? '' : '0px' }} className="overflow-y-hidden">
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
    <div className="h-screen flex flex-col items-center">
      <Tab mode={2} />
      <div className="flex-1 flex flex-col justify-center items-center">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40H39.0316V35.674H4.39431V22.1907H32.6025L32.7164 17.8647H4.39431V4.326H39.0316V0H0V40Z" fill="#2A59D8" />
          <path d="M75.2283 23.5687C75.9905 22.8626 76.5674 21.985 76.9096 21.0112C77.3128 19.8614 77.5606 18.6644 77.6467 17.4509C77.7607 16.1142 77.8196 14.5622 77.8196 12.8362C77.8367 10.9056 77.7401 8.97572 77.5302 7.05617C77.3325 5.42039 76.8559 4.06174 76.1161 3.01763C75.3592 1.95289 74.241 1.17173 72.7902 0.697367C71.3839 0.233315 69.4762 0 67.1206 0H45.5157V40H49.91V25.6737H67.9769C68.1615 25.6737 68.3553 25.6659 68.553 25.6492L74.3052 40H78.7571L72.7104 24.957C73.7421 24.6115 74.588 24.1462 75.2283 23.5687ZM49.9152 4.38271H64.308L54.7861 15.1835H62.1279L57.452 21.2935H49.9152V4.38271ZM70.7698 21.0203C69.9109 21.2007 68.6827 21.2923 67.1206 21.2923H58.1997L68.498 12.8362H61.1563L65.0098 4.38271H67.1206C68.6827 4.38271 69.9122 4.46521 70.7777 4.62892C71.5633 4.77716 72.129 5.10586 72.5048 5.63437C72.8976 6.18736 73.1398 7.02523 73.2276 8.12349C73.3218 9.29264 73.369 10.8782 73.369 12.8375C73.369 14.7968 73.3258 16.3707 73.2276 17.5218C73.1398 18.602 72.8963 19.4309 72.5048 19.9839C72.1277 20.5163 71.5594 20.8553 70.7698 21.0203Z" fill="#2A59D8" />
          <path d="M85.1247 40H113.601V35.674H89.5177V22.1907H108.75V17.8647H89.5177V4.326H113.601V0H85.1247V40Z" fill="#2A59D8" />
          <path d="M156.401 34.0627L124.558 0.135349L124.431 0H120.278V40H124.671V5.936L156.515 39.8634L156.642 40H160.796V0H156.401V34.0627Z" fill="#2A59D8" />
          <path d="M165.987 0V3.8207H180.768V40H185.162V3.8207H200V0H165.987Z" fill="#2A59D8" />
        </svg>
        <span>V1.5872</span>
      </div>
      <div className="p-2">
        Made with ❤️ by team 5
      </div>
    </div>
  )
}