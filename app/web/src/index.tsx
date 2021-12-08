import { initApp } from 'web.init/src/initApp'
import { io } from "socket.io-client";
import './index.css'
import { eventBus } from "./global"
import Notif from './components/notif';


const socket = io("http://e.plansys.co:3333", { transports: ['websocket'] });
socket.on("connect", () => {
    console.log("konek ke soket");
});

const u = localStorage.getItem("user");
if (u) {
    const uu = JSON.parse(u);
    if (uu.id) {
        console.log("ID KITA : ",uu.id)
        socket.on("notif_"+uu.id, (e) => {
            console.log("oleh data")
            eventBus.dispatch("notif", { message: e.message })
            console.log(e)
        })
    }
}


initApp(<Notif/>)