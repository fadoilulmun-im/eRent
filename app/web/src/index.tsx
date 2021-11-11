import { initApp } from 'web.init/src/initApp'
import { io } from "socket.io-client";
import './index.css'
import { eventBus } from "./global"


const socket = io("http://127.0.0.1:666", { transports: ['websocket'] });
socket.on("connect", () => {
    console.log("konek ke soket");
    let time = new Date();
    socket.emit("admin", { user_id: 5, time: time.getTime(), event: "notif", data: { nama: "aaa", oke: "aaaa" } })
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


initApp()