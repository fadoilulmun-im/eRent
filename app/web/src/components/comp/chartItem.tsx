import { numberWithCommas } from '../../global';
import { motion, useAnimation } from 'framer-motion';

export default (props) => {
    const anim = useAnimation();

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
            <div className="flex my-2 self-stretch space-x-4 items-center justify-start bg-white">
                <div
                    className="bg-gray-100 p-4 rounded"
                    style={{ width: '9rem' }}
                >
                    <img src="/fimgs/232_297.x1.svg" />
                </div>
                <div className="flex flex-col space-y-3 items-start justify-start flex-grow">
                    <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                        <div className="text-base font-medium leading-relaxed text-coolGray-900">
                            {props.data.barang.nama_barang}
                        </div>
                        <div className="text-sm leading-snug text-coolGray-500">Rp {numberWithCommas(props.data.barang.harga_barang)}</div>
                    </div>
                    <div className="flex self-stretch items-center justify-between">
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
