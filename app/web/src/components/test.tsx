// /** @jsx jsx */
// import { jsx } from "@emotion/react";
// import { useComponent } from "web.utils/component";

import Skeleton from "./comp/skeleton"

export default () => {
  return (
    <div >
      <div className="grid grid-cols-2 gap-3 w-full px-6">

        {Array.from({length: 4}, (item, index) =>(
        <div key={index} className="flex flex-col rounded overflow-hidden overflow-hidde">
          <Skeleton style={{ minHeight: '7rem' }} />
          <div className="bg-white px-4 py-3 space-y-1">
            <Skeleton style={{ minHeight: '1rem', width: '100%' }} />
            <Skeleton style={{ minHeight: '1rem', width: '80%' }} />
          </div>
        </div>))}
      </div>
    </div>
  )
}