/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useComponent } from "web.utils/component";

export default ({ children }) => {
  return (
    <div
      className="flex self-stretch items-center justify-start px-6 py-2 bg-white shadow"
      style={{boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)',zIndex: 10}}
    >
      <div className="flex flex-1 space-x-2 items-center justify-end">
        <div className="flex items-center justify-end px-6 py-2 border rounded border-blue-700">
          <div className="text-base font-medium leading-relaxed text-center text-blue-700">
            Cancel
          </div>
        </div>
        <div className="flex items-center justify-end px-6 py-2 bg-blue-700 rounded">
          <div className="text-base font-medium leading-relaxed text-center text-white">
            Save
          </div>
        </div>
      </div>
    </div>
  )
}