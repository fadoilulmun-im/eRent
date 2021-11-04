import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {eventBus} from "../global"
export default (props) => {
    const bell = useAnimation();
    const cart = useAnimation();

    useEffect(() => {
        eventBus.on('bell', () => {
            bell.start({ rotateZ: [20, -15, 10, -5, 0] })
        })
        eventBus.on('cart', (e) => {
            cart.start({ x: [5, -5, 3, -2, 0] })
        })
    });

    return (
    <div
        className={
            "flex self-stretch space-x-4 items-center px-6 pb-2 pt-8 " +
            (props.mode === 1 ? "justify-end" : "justify-between ") +
            (props.mode === 3 ? "bg-gray-100 justify-between " : "")
        }
        style={{ paddingTop: '3rem', paddingBottom: '1rem' }}
    >
        <button
            onClick={() => {
                props.onBack?props.onBack():window.history.back();
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
            <motion.button
                whileTap={{ scale: 0.9 }}
                animate={bell}
                style={{ width: '2rem', height: '2rem' }} className="flex items-center">
                <img src="/fimgs/157_549.x1.svg" />
                {/* {user.notif && (
                    <div
                        style="width:0.5rem;height:0.5rem;transform:translate(10px,-5px)"
                        class=" absolute bg-blue-700 rounded-full"
                    />
                )} */}
            </motion.button>
            <motion.button
                whileTap={{ scale: 0.9 }}
                animate={cart}
                onClick={() => {
                    if (localStorage.getItem('user')) {
                        location.href = "/m/cart-mobile"
                    } else {
                        eventBus.dispatch('notif', { message: "login dulu Ya!" });
                        eventBus.dispatch('notLogin', {});
                    }
                }}
                style={{ width: '2rem', height: '2rem' }}
                className="flex items-center"
            >
                <img src="/fimgs/157_606.x1.svg" />
                <div
                    style={{ width: '0.5rem', height: '0.5rem', transform: 'translate(15px,-5px)' }}
                    className=" absolute bg-blue-700 rounded-full"
                />
            </motion.button>
        </div>

    </div>)
}