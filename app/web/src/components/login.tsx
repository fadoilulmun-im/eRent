import { useState, useEffect } from "react";
import { api } from "web.utils/src/api";
import { motion } from "framer-motion";
import eventBus from "./Event/EventBus";

export default () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loding, setLoding] = useState(false);
    const inpChange = (e) => {
        console.log(e.target.value);
        let a = {};
        a[e.target.name] = e.target.value;
        setForm({ ...form, ...a });
    }
    const login = () => {
        console.log(form);
        setLoding(true);
        api("/api/customer/login", form).then((e) => {
            console.log(e);
            setLoding(false);
            if (e.status == "ERROR") {
                console.log('error')
                eventBus.dispatch('notif',{message:e.message});
            } else {
                localStorage.setItem('user', JSON.stringify(e.data.customer));
                location.reload();
            }
            //mengara ke home page
        });
    }

    return (
        <div className="flex items-start justify-start px-6 bg-white pb-3">
            <div className="flex flex-1 flex-col space-y-6 items-start justify-start">
                <img
                    src="/fimgs/147_59.x1.svg"
                    className="flex self-stretch flex-col items-center justify-start"
                />
                <div className="flex self-stretch items-center justify-center">
                    <div className="text-3xl font-bold text-center">Hello again.</div>
                </div>

                <div className="flex self-stretch flex-col space-y-5 items-start justify-start">
                    <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
                        <div className="text-base font-medium leading-relaxed text-coolGray-500">
                            Username or Email
                        </div>
                        <div className="flex self-stretch items-start justify-start">
                            <input
                                name='email'
                                value={form.email}
                                onChange={(e) => { inpChange(e) }}
                                placeholder="yourmail@mail.com"
                                className={
                                    "flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"
                                }
                            />
                        </div>
                    </div>
                    <div className="flex self-stretch flex-col space-y-4 items-start justify-start">
                        <div className="text-base font-medium leading-relaxed text-coolGray-500">
                            Password
                        </div>
                        <div className="flex self-stretch items-start justify-start">
                            <div className=" flex items-center justify-start py-2 px-4  bg-gray-100 border rounded border-gray-100 w-full">
                                <input
                                    type="password"
                                    // value={meta.password}
                                    value={form.password}
                                    name='password'
                                    onChange={(e) => { inpChange(e) }}
                                    placeholder="*******"
                                // onChange={(e) => meta.action.passwordChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex self-stretch space-x-6 items-center justify-between">
                    <div className="flex space-x-2 items-center justify-start">
                        <input type="checkbox" />
                        <div className="text-base leading-relaxed text-coolGray-900">
                            Remember me
                        </div>
                    </div>
                    <div className="flex items-start justify-start">
                        <a
                            href="/m/forget-password-mobile"
                            className="text-base leading-relaxed text-right text-coolGray-900"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </div>

                <div className="flex self-stretch flex-col items-start justify-start">
                    <button
                        onClick={() => {
                            loding?'':login();
                        }}
                        className="flex  space-x-2 self-stretch items-center justify-center px-4 py-2 bg-blue-700 rounded text-base font-medium leading-relaxed text-center text-white"
                    >
                        {loding ? "Loading.." : "Log In"}

                    </button>
                </div>

                <div className="flex self-stretch items-center justify-center">
                    <div className="text-base leading-relaxed text-center ">
                        Not have account yet?{" "}
                        <a onClick={()=>{
                            location.href = "/m/register-mobile"
                        }} className=" text-blue-500 p-2">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}