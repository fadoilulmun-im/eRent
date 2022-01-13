import { numberWithCommas } from '../../global';
import { motion, useAnimation } from 'framer-motion';
import Image from "./image";
import { useEffect } from 'react';
export default (props) => {
    const anim = useAnimation();


    useEffect(() => {
        console.log("gam");
    })

    const del = () => {
        anim.start({
            height: 0,
            opacity: 0,
        }).then((e) => {
            // console.log("dell item");
            props.del();
        });
    }

    return (
        <motion.div animate={anim} style={{ overflowY: 'hidden' }}>
            <div className={"flex my-2 self-stretch space-x-4 items-center justify-start bg-white "}>
                <div
                    className="bg-gray-100 p-4 rounded flex justify-center items-center"
                    style={{ width: '9rem' }}
                >
                    {/* <img src={props.data.barang.gambar_barang} /> */}
                    <Image src={props.data.barang.gambar_barang} />
                </div>
                <div className="flex flex-col space-y-3 items-start justify-start flex-grow">
                    <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                        <div className="text-base font-medium leading-relaxed text-coolGray-900">
                            {props.data.barang.nama_barang}
                        </div>
                        <div className='flex justify-between w-full'>
                            <div className="text-sm leading-snug text-coolGray-500">Rp {numberWithCommas(props.data.barang.harga_barang)}</div>
                            <div className="text-sm leading-snug text-right text-coolGray-500">
                                {/* stock: {meta.barang.stok_barang} */}
                                stock: {props.data.barang.stok_barang}
                            </div>
                        </div>
                    </div>
                    <div className="flex self-stretch items-center justify-between">

                        {props.data.barang.stok_barang < 1 ? (<span className=' text-red-500'>Out of stock</span>) :
                            (

                                <div className="flex space-x-3 items-center justify-start">
                                    <div className="flex justify-center">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => {
                                                props.sub();
                                            }}
                                            className="flex items-start justify-start px-1 py-0 border rounded border-coolGray-500"
                                        >
                                            -
                                        </motion.button>
                                    </div>
                                    <div className="text-sm leading-snug text-center text-coolGray-500 px-4">
                                        {props.data.quantity}
                                    </div>
                                    <div className="flex flex-col space-y-96 justify-center">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => {
                                                props.add();
                                            }}
                                            className="flex items-start justify-start px-1 py-0 border rounded border-coolGray-500"
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                </div>
                            )}

                        <div className="flex space-x-3 items-center justify-end">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    del();
                                }}
                            >
                                <img
                                    className={props.mode ? "hidden" : ""}
                                    // style="width: 18px; min-width: 18px; max-width: 18px; height: 20px; min-height: 20px; max-height: 20px;"
                                    src="/fimgs/214_464.x1.svg"
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
