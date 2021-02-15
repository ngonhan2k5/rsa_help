
fetch('ip')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let url = (data && data.ip) || prompt("Cannot get PC's local IP, please input");
        url = `https://${url}/send.html`

        let QRCode = require('qrcode')
        let canvas = document.getElementById('canvas')
        let link = document.getElementById('link')

        QRCode.toCanvas(canvas, url, function (error) {
            if (error) console.error(error)
            else
                console.log('success!');
        })

        link.innerText = url;
    });

