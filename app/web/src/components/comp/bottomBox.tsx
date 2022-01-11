import { numberWithCommas } from "../../global";

export default (props) => {
    return (<div
        className="flex self-stretch items-center justify-start px-6 py-4 bg-white shadow"
        style={{ boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.15)', zIndex: 10 }}
    >
        <div className="flex flex-1 space-x-4 items-center justify-start">
            <div className="flex flex-1 flex-col space-y-0.5 items-start justify-start">
                <div className="text-base font-medium leading-relaxed text-coolGray-500">
                    Admin Cost
                </div>
                <div className="text-xl font-semibold text-coolGray-900">
                    Rp {props.total_harga ? numberWithCommas(props.total_harga) : 0}
                </div>
            </div>
            <div className="flex items-center justify-end px-6 py-2 bg-blue-700 rounded">
                <button
                    onClick={props.btnClick}
                    className="text-base font-medium leading-relaxed text-center text-white"
                >
                    Choose This
                </button>
            </div>
        </div>
    </div>)
}
