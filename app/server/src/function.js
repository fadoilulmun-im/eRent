const nowLocal = () => {
    let now = new Date().toLocaleString("id-id");
    let nowsplit = now.split(" ");

    let date = nowsplit[0];
    let datesplit = date.split("/");
    date = Number(datesplit[2]) + "-" + Number(datesplit[1]) + "-" + Number(datesplit[0]);

    let time = nowsplit[1];
    time = time.replace(".", ":");
    time = time.replace(".", ":");

    const sekarang = date + " " + time + ".000Z";

    return sekarang
}

module.exports = nowLocal;