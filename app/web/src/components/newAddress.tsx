import { useState, useEffect } from 'react'
import SaveCancel from './saveCancel';

import { motion } from 'framer-motion'
import { api } from 'web.utils/src/api';
import { eventBus } from '../global';

const InpSe = (props) => {
    const [up, setUp] = useState(false);
    useEffect(() => {
        // console.log(props.items);
    })
    return (
        <div className="space-y-1">
            <label className="text-base font-medium leading-relaxed text-coolGray-500">{props.title}</label>
            <div className="bg-gray-100 py-2 px-4 rounded flex">
                {/* <input name={props.name} value={props.value} type={props.type ? props.type : 'text'} onChange={(e) => { props.onChange(e) }} /> */}
                <select onChange={(e) => { props.onChange(e) }} name={props.name} value={props.value} onBlur={() => { setUp(false) }} onFocus={() => { setUp(true) }} className="w-full">
                    {props.items ? props.items.map((x, i) => (
                        <option key={i} value={i}>{x.name}</option>
                    )) : ""}
                </select>
                <motion.span animate={{ rotateZ: up ? 180 : 0 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '1.6rem', height: '1.6rem' }}><path fill="#111827" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" /></svg>
                </motion.span>
            </div>
        </div>
    )
}

const Inp = (props) => {

    return (
        <div className="space-y-1">
            <label className="text-base font-medium leading-relaxed text-coolGray-500">{props.title}</label>
            <div className="bg-gray-100 py-2 px-4 rounded">
                <input name={props.name} value={props.value} type={props.type ? props.type : 'text'} onChange={(e) => { props.onChange(e) }} />
            </div>
        </div>
    )
}



export default (props) => {

    const [user, setUser] = useState({ id: null });

    const [address, setAddress] = useState({ addressTitle: '', name: '', phoneNumber: '', roadName: '', province: '', city: '', subDistrict: '', postNumber: '', additional: '' })

    const [addidx, setAddIdx] = useState({ province: 0, city: 0, subDistrict: 0 })

    const [province, setProvince] = useState([])
    const [city, setCity] = useState([])
    const [subDistrict, setSubDistrict] = useState([])

    const [loding, setLoding] = useState(true);
    const [stx, setStx] = useState(false);
    useEffect(() => {
        //get provinde list
        let u = localStorage.getItem('user')
        if (u) {
            let uu = JSON.parse(u);
            setUser(uu);
        } else {
            location.href = '/m/'
        }
        let t = address;
        fetch("http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then((response) => response.json())
            .then((data) => {
                setProvince(data);
                //console.log(data);

                t['province'] = data[0].name;


                fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${data[0].id}.json`)
                    .then((response) => response.json())
                    .then((data) => {
                        setCity(data);
                        //console.log(data);
                        t['city'] = data[0].name;


                        fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${data[0].id}.json`)
                            .then((response) => response.json())
                            .then((data) => {
                                setSubDistrict(data);
                                //console.log(data);
                                t['subDistrict'] = data[0].name;
                                console.log(t);

                            });

                    });

            });

        setAddress(t);



        setLoding(false);
    }, [])

    useEffect(() => {
        console.log(props.addr);
        if (props.addr) {
            let dt = {
                addressTitle: props.addr.kategori_alamat, name: props.addr.nama,
                phoneNumber: props.addr.no_hp, roadName: props.addr.alamat_pengiriman,
                postNumber: props.addr.kode_post,
                additional: props.addr.informasi_tambahan
            }

            setAddress({...address,...dt});
        }else{
            setAddress({ addressTitle: '', name: '', phoneNumber: '', roadName: '', province: '', city: '', subDistrict: '', postNumber: '', additional: '' });
        }
    }, [props.addr])

    const inpChange = (e) => {
        let t = {}
        t[e.target.name] = e.target.value
        setAddress({ ...address, ...t });
    }

    const inpChange2 = (e) => {
        let t = {};
        t[e.target.name] = e.target.value;
        setAddIdx({ ...addidx, ...t });

        switch (e.target.name) {
            case 'province':
                t[e.target.name] = province[Number.parseInt(e.target.value)]['name']
                setAddress({ ...address, ...t });

                fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province[Number.parseInt(e.target.value)]['id']}.json`)
                    .then((response) => response.json())
                    .then((data) => {
                        setCity(data);

                    });
                break;
            case 'city':
                t[e.target.name] = city[Number.parseInt(e.target.value)]['name']
                setAddress({ ...address, ...t });

                fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${city[Number.parseInt(e.target.value)]['id']}.json`)
                    .then((response) => response.json())
                    .then((data) => {
                        setSubDistrict(data);

                    });
                break;
            case 'subDistrict':
                t[e.target.name] = subDistrict[Number.parseInt(e.target.value)]['name']
                setAddress({ ...address, ...t });
                break;
            default:
                console.log("NotFoun");

        }
    }


    const Save = () => {
        console.log(address);

        setStx(true);
        let dt = {
            kategori_alamat: address.addressTitle, nama: address.name,
            no_hp: address.phoneNumber, provinsi: address.province, kota: address.city,
            kecamatan: address.subDistrict, alamat_pengiriman: address.roadName,
            kode_post: address.phoneNumber, informasi_tambahan: address.additional
        };
        if (props.addr) {
            //update addr
            api(`/api/customer/update-alamat/${props.addr.id}`, dt).then((e) => {
                console.log(e);
                if (e.status == 'SUCCESS') {
                    eventBus.dispatch('notif', { message: e.message });
                    props.onSave();
                    //history.back();
                }
                setStx(false);
            }).catch((e) => {
                console.log("add yang error");
                
            })
        } else {

            api(`/api/customer/${user.id}/add-alamat`, dt).then((e) => {
                console.log(e);
                if (e.status == 'SUCCESS') {
                    eventBus.dispatch('notif', { message: e.message });
                    props.onSave();
                    //history.back();
                }
                setStx(false);
            }).catch((e) => {
                console.log("add yang error");
            })
        }
    }
    return (

        <div className="flex flex-col space-y-7 items-start justify-start h-full overflow-y-auto">
            {/* <Tab mode={2} /> */}
            <div className="flex flex-col w-full px-6 space-y-4 overflow-y-auto pb-10">
                <div className="text-2xl font-bold text-coolGray-900">New Address</div>
                <Inp name="addressTitle" value={address.addressTitle} title="Address Title" onChange={inpChange} />
                <Inp name="name" value={address.name} title="Name" onChange={inpChange} />
                <Inp name="phoneNumber" value={address.phoneNumber} title="Phone Number" onChange={inpChange} />
                <Inp name="roadName" value={address.roadName} title="Road Name - House Number" onChange={inpChange} />

                <InpSe name="province" onChange={inpChange2} value={addidx.province} title="Province" items={province} />
                <InpSe name="city" onChange={inpChange2} value={addidx.city} title="City" items={city} />
                <InpSe name="subDistrict" onChange={inpChange2} value={addidx.subDistrict} title="Subdistrict" items={subDistrict} />

                <Inp name="postNumber" value={address.postNumber} type={'number'} title="Post Number" onChange={inpChange} />
                <Inp name="additional" value={address.additional} title="Additional Details" onChange={inpChange} />
            </div>
            <SaveCancel onCancel={() => { props.onCancel() }} onSave={() => { stx ? '' : Save() }} title={stx ? 'Loding..' : 'Save'} />
        </div>
    )
}