fetch('ip')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let url = (data && data.ip) || prompt("Cannot get PC's local IP, please input");
        url = `https://${url}/api/setrsa`

        // let canvas = document.getElementById('canvas')

        window.url = url;
    });