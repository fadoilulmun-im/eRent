import Loding from "./loding";
import Tab from "./Tab";
import { useEffect, useRef, useState } from "react";

import { ListInput } from 'framework7-react';
export default () => {
    const [loding, setLoding] = useState(false);

    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab mode={2} />
                <div className="h-full overflow-y-auto space-y-4">
                    <div className="text-3xl font-bold text-coolGray-900 px-6">Checkout</div>
                    <div className="flex flex-wrap self-stretch items-start justify-between overflow-hidden px-5">
                        <div className="flex flex-col flex-1 m-2">
                            <span>Start Date</span>
                            <div className="bg-gray-100 px-3 py-2 rounded ">
                                <input
                                    style={{ minWidth: '20px' }}
                                    type="date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 m-2">
                            <span>End Date</span>
                            <div className="bg-gray-100 px-3 py-2 rounded">
                                <input
                                    style={{ minWidth: '20px' }}
                                    type="date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <ListInput
                        
                        type="datepicker"
                        input={false}
                        readonly
                        calendarParams={{ openIn: 'customModal', header: true, footer: true, dateFormat: 'MM dd yyyy', rangePicker: true }}
                    >
                    <button>AAAAAAAA</button>
                    </ListInput>
                </div>

            </div>
        </>
    );
}