import qr from "qrcode-terminal";

async function handler(err, result) {
    if (err) {
       console.log("error on aplication");
       return;
    }

    const isSmall = result.type == 2;

    qr.generate(result.link, {small: isSmall}, (qrcode) => {
        console.log(qrcode);
    });
};

export default handler;

