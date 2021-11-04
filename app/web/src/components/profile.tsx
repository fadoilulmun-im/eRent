import { Button } from 'framework7-react';
import { api } from "web.utils/src/api";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])


    const logout = () => {
        api('http://localhost:3200/api/logout').then((e) => {
            if (e.status == 'SUCCESS') {
                localStorage.removeItem('user');
                location.reload();
            }
        });
    }
    return (
        <div className="flex self-stretch flex-col  flex-grow space-y-5 items-start justify-start h-full overflow-y-auto"
            style={{ paddingBottom: '3rem' }}>
            <div className="flex flex-col space-y-4 items-start justify-start mb-2 w-full">
                <div className="text-3xl font-bold text-coolGray-900 px-6 flex justify-between w-full">
                    <span>Profile</span>
                </div>
            </div>
            <div className="flex self-stretch space-x-4 items-center justify-start px-6">
                <span style={{ width: '4rem', height: '4rem' }} className=" align-middle bg-white rounded-full overflow-hidden flex justify-center items-center">
                    <img
                        src={user['foto']?user['foto']: "/fimgs/364_1722.x1.png"}
                    />
                </span>
                <div className="flex flex-1 flex-col space-y-1 items-start justify-start">
                    <div className="text-xl font-bold text-coolGray-900">
                        {user['nama_customer'] ? user['nama_customer'] : "No Name"}
                    </div>
                    <div className="text-base leading-relaxed text-coolGray-500">
                        {user['no_hp'] ? user['no_hp'] : "00000"}
                    </div>
                </div>
            </div>
            <div className="flex flex-col self-stretch justify-start space-y-3">
                <span className="text-xl font-semibold text-coolGray-900 px-6">
                    Order History
                </span>
                <button className="flex justify-between px-6 py-4 items-center hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-4">
                        <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M20.49,7.52a.19.19,0,0,1,0-.08.17.17,0,0,1,0-.07l0-.09-.06-.15,0,0h0l0,0,0,0a.48.48,0,0,0-.09-.11l-.09-.08h0l-.05,0,0,0L16.26,4.45h0l-3.72-2.3A.85.85,0,0,0,12.25,2h-.08a.82.82,0,0,0-.27,0h-.1a1.13,1.13,0,0,0-.33.13L4,6.78l-.09.07-.09.08L3.72,7l-.05.06,0,0-.06.15,0,.09v.06a.69.69,0,0,0,0,.2v8.73a1,1,0,0,0,.47.85l7.5,4.64h0l0,0,.15.06.08,0a.86.86,0,0,0,.52,0l.08,0,.15-.06,0,0h0L20,17.21a1,1,0,0,0,.47-.85V7.63S20.49,7.56,20.49,7.52ZM12,4.17l1.78,1.1L8.19,8.73,6.4,7.63Zm-1,15L5.5,15.81V9.42l5.5,3.4Zm1-8.11L10.09,9.91l5.59-3.47L17.6,7.63Zm6.5,4.72L13,19.2V12.82l5.5-3.4Z" /></svg>
                        <div className='text-base'>My Orders</div>
                    </div>
                    <svg style={{ width: '1.6rem', height: '1.6rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" /></svg>
                </button>
            </div>
            <div className="flex flex-col self-stretch justify-start space-y-3">
                <span className="text-xl font-semibold text-coolGray-900 px-6">
                    My Account
                </span>
                <button
                    onClick={() => {
                        location.href = "/m/edit-profile-mobile"
                    }}
                    className="flex justify-between px-6 py-4 items-center hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-4">
                        <svg
                            style={{ width: '1.5rem', height: '1.5rem' }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#111827"
                                d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"
                            />
                        </svg>
                        <span className='text-base'>Edit Profile</span>
                    </div>
                    <svg style={{ width: '1.6rem', height: '1.6rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" /></svg>
                </button>
                <button onClick={()=>{location.href="/m/my-address-mobile"}} className="flex justify-between px-6 py-4 items-center hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-4">
                        <svg
                            style={{ width: '1.5rem', height: '1.5rem' }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path fill="#111827" d="M11,11.9V17a1,1,0,0,0,2,0V11.9a5,5,0,1,0-2,0ZM12,4A3,3,0,1,1,9,7,3,3,0,0,1,12,4Zm4.21,10.42a1,1,0,1,0-.42,2C18.06,16.87,19,17.68,19,18c0,.58-2.45,2-7,2s-7-1.42-7-2c0-.32.94-1.13,3.21-1.62a1,1,0,1,0-.42-2C4.75,15.08,3,16.39,3,18c0,2.63,4.53,4,9,4s9-1.37,9-4C21,16.39,19.25,15.08,16.21,14.42Z" />
                        </svg>
                        <span className='text-base'>My Address</span>
                    </div>
                    <svg style={{ width: '1.6rem', height: '1.6rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" /></svg>
                </button>

            </div>
            <div className="flex flex-col self-stretch justify-start space-y-3">
                <span className="text-xl font-semibold text-coolGray-900 px-6">
                    Help
                </span>
                <button className="flex justify-between px-6 py-4 items-center hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-4">
                        <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M13,14H9a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2ZM17,4H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Zm-3-9H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" /></svg>
                        <span className='text-base'>About</span>
                    </div>
                    <svg style={{ width: '1.6rem', height: '1.6rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" /></svg>
                </button>
                <button className="flex justify-between px-6 py-4 items-center hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-4">
                        <svg style={{ width: '1.5rem', height: '1.5rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z" /></svg>
                        <span className='text-base'>Request Delete Account</span>
                    </div>
                    <svg style={{ width: '1.6rem', height: '1.6rem' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#111827" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z" /></svg>
                </button>
            </div>
            <div className="px-6">
                <button onClick={() => { logout() }} className="text-base text-red-600 ">Log Out</button>
            </div>
        </div>
    )
}