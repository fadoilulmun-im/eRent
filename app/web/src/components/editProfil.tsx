import { useState, useEffect } from "react"
import Tab from "./Tab";
export default () => {
    const [user, setUser] = useState({});
    return (
        <div className="flex flex-1 self-stretch flex-col items-start justify-start bg-white h-screen w-full">
            {/*notif and a chart button*/}
            {/* <top-naviagation mode={2} /> */}
            <Tab mode={2}/>
            <div className="flex self-stretch flex-col space-y-6 items-start justify-start relative overflow-y-auto">
                <div className="flex self-stretch flex-col space-y-4 items-start justify-start px-6">
                    <div className="text-xl font-bold text-coolGray-900">Edit Profile</div>
                    <div className="flex self-stretch space-x-2 items-center justify-start">
                        <img
                            src="/fimgs/364_1722.x1.png"
                            className="flex flex-col items-start justify-start bg-white"
                        // style="width: 64px; min-width: 64px; max-width: 64px; height: 64px; min-height: 64px; max-height: 64px;"
                        />
                        <button className="text-base leading-relaxed text-blue-700 text-left">
                            Change Picture
                        </button>
                    </div>
                    <div className="flex self-stretch flex-col space-y-4 items-start justify-start pb-10">
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Name
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    // value={meta.name}
                                    name="name"
                                    // onChange={(e) => meta.action.inpChange(e)}
                                    placeholder="John Doe"
                                    className={
                                        "flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Email
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    // value={meta.email}
                                    name="email"
                                    // onChange={(e) => meta.action.inpChange(e)}
                                    placeholder="sales@andromedia.co.id"
                                    className={
                                        "flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Phone Number
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    // value={meta.no_hp}
                                    name="no_hp"
                                    // onChange={(e) => meta.action.inpChange(e)}
                                    placeholder="0854"
                                    className={
                                        "flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Password
                            </div>
                            <div className="flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full">
                                <input
                                    // value={meta.password}
                                    name="password"
                                    // onChange={(e) => meta.action.inpChange(e)}
                                    type="password"
                                    placeholder="*******"
                                />
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Retype Password
                            </div>
                            <div className="flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full">
                                <input
                                    // value={meta.repassword}
                                    // name="repassword"
                                    // onChange={(e) => meta.action.inpChange(e)}
                                    type="password"
                                    placeholder="*******"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button-edit-profile /> */}
            
        </div>
    )
}