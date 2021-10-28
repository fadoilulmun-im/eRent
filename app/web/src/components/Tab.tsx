import React from "react";

export default (props) => {
    return (<div
        className={
            "flex self-stretch space-x-4 items-center px-6 pb-2 pt-8 " +
            (props.mode === 1 ? "justify-end" : "justify-between ") +
            (props.mode === 3 ? "bg-gray-100 justify-between " : "")
        }
        style={{ paddingTop: '3rem', paddingBottom: '1rem' }}
    >
        <button
            onClick={() => {
                window.history.back();
                //history.back();
            }}
            className={props.mode === 1 ? "hidden" : ""}
        >
            <img src="/fimgs/192_116.x1.svg " />
        </button>
        <div
            className={
                "flex space-x-2 items-center " + (props.mode === 2 ? "hidden" : "")
            }
        >
            <button style={{width: '2rem',height: '2rem'}} className="flex items-center">
                <img src="/fimgs/157_549.x1.svg" />
                {/* {user.notif && (
                    <div
                        style="width:0.5rem;height:0.5rem;transform:translate(10px,-5px)"
                        class=" absolute bg-blue-700 rounded-full"
                    />
                )} */}
            </button>
            <button
                onClick={() => {
                    location.href = "/m/cart-mobile";
                }}
                style={{width: '2rem',height: '2rem'}}
                className="flex items-center"
            >
                <img src="/fimgs/157_606.x1.svg" />
                <div
                    style={{width:'0.5rem',height:'0.5rem',transform:'translate(15px,-5px)'}}
                    className=" absolute bg-blue-700 rounded-full"
                />
            </button>
        </div>

    </div>)
}