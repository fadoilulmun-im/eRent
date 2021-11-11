import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { api } from 'web.utils/src/api';
import { numberWithCommas } from '../global';
import Tab from './Tab';
import Loding from './loding';



const NotifItem = (props)=>{
    return (
        <div>
            
        </div>
    )
}


export default () => {
    const [user, setUser] = useState<any>({});
    const [loding, setLoding] = useState(true);
    return (
        <>
            <Loding state={loding} />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab />
                <div className="h-full overflow-y-auto space-y-4">

                </div>
            </div>
        </>
    );
}