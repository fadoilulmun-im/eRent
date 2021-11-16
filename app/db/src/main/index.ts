import { PrismaClient } from '@prisma/client'
import { Server } from "socket.io";
export const main = new PrismaClient()




// main.transaksi.findMany({select:{tanggal_pengembalian:true,id_customer:true}}).then((e)=>{
//       console.log(e)
// })


