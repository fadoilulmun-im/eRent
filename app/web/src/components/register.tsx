import React, { useState, useEffect, useRef } from 'react';
import { api } from 'web.utils/src/api';
import { fileUpload } from "../global";
import Tab from './Tab';
import Loding from './loding';
import eventBus from "./Event/EventBus";




export default () => {
    const [loding, setLoding] = useState(false);
    const [form, setForm] = useState({ email: '', password: '', re_password: '', nama_customer: '', nama_perusahaan: '' });
    const [formErr, setFormErr] = useState({ email: false, password: false, re_password: false, nama_customer: false, nama_perusahaan: false });

    const file = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("Choose File")
    const [fileData, setFileData] = useState(null)


    const inpChange = (e) => {
        let a = {};
        a[e.target.name] = e.target.value;
        setForm({ ...form, ...a });

        let b = {}
        b[e.target.name] = false;
        setFormErr({ ...formErr, ...b });
    }

    const getFileName = (e) => {
        if (e?.target) {
            setFileName(e.target.files[0].name)
            setFileData(e.target.files[0])
            console.log(e.target.files[0].name)
        }
    }

    const register = () => {
        //cek
        let t_formErr = { email: false, password: false, re_password: false, nama_customer: false, nama_perusahaan: false };
        let isKosong = false;
        for (var inp in form) {
            console.log(form[inp])
            if (form[inp] == '') {
                t_formErr[inp] = true;
                isKosong = true;
            }
        }
        if (isKosong) {
            eventBus.dispatch('notif', { message: "input cannot be empty" });
            console.log(t_formErr);
            setFormErr(t_formErr);
        } else {
            if (form.password !== form.re_password) {
                t_formErr['password'] = true;
                t_formErr['re_password'] = true;
                setFormErr(t_formErr);
                eventBus.dispatch('notif', { message: "password and re-type password are not the same" });
            } else {
                if (fileData == null) {
                    eventBus.dispatch('notif', { message: "document cannot be empty" });
                } else {
                    //register

                    api("/api/customer/register",
                        {
                            email: form.email,
                            password: form.password,
                            nama_customer: form.nama_customer,
                            nama_perusahaan: form.nama_perusahaan
                        }).then(async (e) => {
                            //console.log(e);
                            if (e?.status === "SUCCESS") {
                                fileUpload(fileData, `/api/customer/${e.data.id}/upload`).then((e) => {
                                    console.log(e);
                                    location.href = "/m/verification-mobile";
                        
                                })
                            }
                        });
                }

            }
        }


    }


    useEffect(() => {


    }, []);



    return (
        <>
            <Loding state={loding} />
            <input ref={file} type="file" onChange={getFileName} hidden />
            <div className={(loding ? "hidden" : "flex") + " flex-col h-full"}>
                <Tab mode={2} />
                <div className="h-full overflow-y-auto space-y-4 pb-4">
                    <img
                        src="/fimgs/153_1387.x1.svg"
                        className="flex self-stretch flex-col items-center justify-start"
                    />
                    <div className="flex self-stretch items-center justify-center">
                        <div className="text-3xl font-bold text-center">Be part of us.</div>
                    </div>
                    {/* input */}
                    <div className="flex self-stretch flex-col space-y-5 items-start justify-start px-6">
                        <div className="flex self-stretch flex-col space-y-1 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Email
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    value={form.email}
                                    name="email"
                                    onChange={inpChange}
                                    placeholder="yourmail@mail.com"
                                    className={
                                        (formErr.email ? " ring-1 ring-red-500" : "") + " border-gray-100 flex items-center justify-start py-2 px-4 bg-gray-100 border rounded  w-full"
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex self-stretch flex-col space-y-1 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Name
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    value={form.nama_customer}
                                    name="nama_customer"
                                    onChange={inpChange}
                                    placeholder="Your Name"
                                    className={
                                        (formErr.nama_customer ? " ring-1 ring-red-500" : "") + " border-gray-100 flex items-center justify-start py-2 px-4 bg-gray-100 border rounded  w-full"
                                    }
                                />
                            </div>
                        </div>


                        <div className="flex self-stretch flex-col space-y-1 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Company Name
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    value={form.nama_perusahaan}
                                    onChange={inpChange}
                                    name="nama_perusahaan"
                                    placeholder="Your Company Name"
                                    className={
                                        (formErr.nama_perusahaan ? " ring-1 ring-red-500" : "") + " border-gray-100 flex items-center justify-start py-2 px-4 bg-gray-100 border rounded  w-full"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-1 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Upload Document
                            </div>
                            <div className="flex space-x-2 items-center justify-start">
                                <div className="flex items-center justify-start px-4 py-2 bg-blue-700 rounded">
                                    <button

                                        onClick={() => {
                                            file.current?.click();
                                        }}
                                        className="text-base leading-relaxed text-center text-white"
                                    >
                                        Choose File
                                    </button>
                                </div>
                                <div className="text-base leading-relaxed text-center text-coolGray-500">
                                    {fileName}
                                </div>
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-1 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Password
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <div className={(formErr.password ? " ring-1 ring-red-500" : "") + " flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"}>
                                    <input
                                        className='w-full'
                                        value={form.password}
                                        onChange={inpChange}
                                        name="password"
                                        type="password"
                                        placeholder="*******"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-1 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Re-type Password
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <div className={(formErr.re_password ? " ring-1 ring-red-500" : "") + " flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"}>
                                    <input
                                        className='w-full'
                                        value={form.re_password}
                                        onChange={inpChange}
                                        name="re_password"
                                        type="password"
                                        placeholder="*******"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex self-stretch flex-col items-start justify-start px-6 pt-3">
                        <button
                            onClick={() => {
                                register();
                            }}
                            className="flex self-stretch items-center justify-center px-4 py-2 bg-blue-600 rounded text-base font-medium leading-relaxed text-center text-white"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className={`flex self-stretch items-center justify-center px-6`}>
                        <div className="[class]">
                            Already have account?{" "}
                            <a href="" className="text-blue-500">
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}