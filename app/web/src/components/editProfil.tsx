import { useState, useEffect, useRef } from "react"
import Tab from "./Tab";
import SaveCancel from "./saveCancel";
import { Page } from 'framework7-react';
import { fileUpload } from "../global";
import { api } from "web.utils/src/api";
import Loding from "./loding";
// import Notif from "./notif";
import { eventBus } from "../global";

export default () => {
    const [user, setUser] = useState({ id: null, name: '', email: '', phoneNumber: '', password: '', rePassword: '', companyName: '' });
    const [image, setImage] = useState({ raw: '', view: '' });
    const fileInp = useRef<HTMLInputElement>(null);

    const [loding,setLoding] = useState(true);
    const [stx,setStx] = useState(false);

    useEffect(() => {
        let dt = localStorage.getItem('user');
        if (dt) {
            let jdt = JSON.parse(dt);
            let t = {};
            t['name'] = jdt.nama_customer ? jdt.nama_customer : "";
            t['email'] = jdt.email ? jdt.email : "";
            t['phoneNumber'] = jdt.no_hp ? jdt.no_hp : "";
            t['id'] = jdt.id ? jdt.id : null;
            t['companyName'] = jdt.nama_perusahaan ? jdt.nama_perusahaan : '';
            let ft = {}
            ft['raw'] = jdt.foto ? jdt.foto : '';
            setImage({ ...image, ...ft });
            setUser({ ...user, ...t });
            setLoding(false);

        } else {
            location.href = '/m/'
        }
    }, [])
    const inpChange = (e) => {
        let t = {}
        t[e.target.name] = e.target.value
        setUser({ ...user, ...t });
    }
    const fileOpen = () => {
        if (fileInp && fileInp.current) {
            fileInp.current.click();
        }
    }
    const handleFile = (e) => {

        if (e.target.files.length) {
            console.log(e.target.files[0].size)
            if((e.target.files[0].size / 1024 / 1024) < 2){
                //kurang dari 2mb
                let y = { raw: URL.createObjectURL(e.target.files[0]), view: e.target.files[0] }
                setImage(y);
            }else{
                eventBus.dispatch('notif',{message:'Image size too big'});
            }

        }
    }
    const Save = () => {
        setStx(true);
        if (image.view !== '') {
            fileUpload(image.view, `/api/customer/${user.id}/upload-foto`).then((e) => {
                console.log(e);
                if(e.status == 'ok'){
                    let u = localStorage.getItem('user');
                    if(u){
                        let uu = JSON.parse(u);
                        
                        uu.foto = e.path;
                        localStorage.setItem('user',JSON.stringify(uu));
                    }
                }else{
                    eventBus.dispatch('notif',{message:'Update profile picture failed'});
                }
                
            });
        }
        if ((user.password != '') && (user.rePassword != '')) {
            console.log("eeee password");
            if(user.password === user.rePassword){
                api(`/api/customer/${user.id}/change-password`,{password:user.password}).then((e)=>{
                    eventBus.dispatch('notif',{message:e.message})
                    console.log(e)
                    setUser({...user,password:"",rePassword:""})

                })
            }else{
                eventBus.dispatch('notif',{message:'Password tidak sama'})
            }
            // api()
        }
        api(`/api/customer/${user.id}/update`, { email: user.email, no_hp: user.phoneNumber, nama_perusahaan: user.companyName, nama_customer: user.name }).then((e) => {
            console.log(e);
            if(e.status == 'SUCCESS'){
                localStorage.setItem('user',JSON.stringify(e.data));
                setStx(false);
                eventBus.dispatch('notif',{message:'Profile Updated'});
            }else{
                eventBus.dispatch('notif',{message:'Update profile failed'});
            }

        })
    }
    return (
        <Page>
            <input onChange={handleFile} type='file' ref={fileInp} style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" />
            <Loding state={loding}/>
            <div className={"h-screen flex-col bg-white "+(loding?'hidden':'flex')}>
                {/*notif and a chart button*/}
                {/* <top-naviagation mode={2} /> */}
                <Tab mode={2} onBack={()=>{location.href='/m/'}} />

                <div className="flex flex-col h-full px-6 space-y-4 overflow-y-auto">
                    <div className="text-xl font-bold text-coolGray-900">Edit Profile</div>
                    <div className="flex items-center justify-start space-x-3">
                        <span style={{ width: '4rem', height: '4rem' }} className=" align-middle bg-white rounded-full overflow-hidden flex justify-center items-center">
                            <img
                                src={image.raw == '' ? "/fimgs/364_1722.x1.png" : image.raw}
                            />
                        </span>
                        <span>
                            <button onClick={() => { fileOpen() }} className="text-base text-blue-700">
                                Change Picture
                            </button>
                        </span>
                    </div>
                    <div className="flex self-stretch flex-col space-y-4 items-start justify-start pb-10">
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Name
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    value={user.name}
                                    name="name"
                                    onChange={(e) => inpChange(e)}
                                    placeholder="Your Name"
                                    className={
                                        "flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex self-stretch flex-col space-y-2 items-start justify-start">
                            <div className="text-base font-medium leading-relaxed text-coolGray-500">
                                Company Name
                            </div>
                            <div className="flex self-stretch items-start justify-start">
                                <input
                                    value={user.companyName}
                                    name="companyName"
                                    onChange={(e) => inpChange(e)}
                                    placeholder="Your Company Name"
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
                                    value={user.email}
                                    onChange={(e) => inpChange(e)}
                                    placeholder="yourmail@mail.com"
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
                                <div className="flex items-center justify-start py-2 px-4 bg-gray-100 border rounded border-gray-100 w-full">
                                    <input
                                        value={user.phoneNumber}
                                        name="phoneNumber"
                                        onChange={(e) => inpChange(e)}
                                        placeholder="Your Number"
                                        type='number'
                                    />
                                </div>
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
                                    value={user.password}
                                    onChange={(e) => inpChange(e)}
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
                                    name="rePassword"
                                    value={user.rePassword}
                                    onChange={(e) => inpChange(e)}
                                    type="password"
                                    placeholder="*******"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <SaveCancel onCancel={()=>{location.href='/m/'}} onSave={() => { stx?'':Save() }} title={stx?'Loading..':'Save'}/>
                {/* <button-edit-profile /> */}

            </div>
        </Page>
    )
}