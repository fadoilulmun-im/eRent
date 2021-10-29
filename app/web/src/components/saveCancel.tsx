/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default (props) => {
  return (
    <div
      className="p-6 bg-white shadow w-full flex space-x-2 justify-end"
      style={{boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)',zIndex: 10}}
    >
      <span className=" text-blue-700 text-base font-medium rounded-md border py-3 px-4 border-blue-700 inline">
        <button onClick={()=>{props.onCancel()}}>Cancel</button>
      </span>
      <span className="bg-blue-700 rounded-md py-3 px-5 text-base font-medium  text-white">
        <button onClick={()=>{props.onSave()}}>{props.title ? props.title : "Save"}</button>
      </span>
    </div>
  )
}