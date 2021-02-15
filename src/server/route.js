let rsa = ''
export default {
    // RSA helper
    setRSA: (req, res, next) => {
        if (req.body && req.body.rsa) {
            console.log(req.body);
            rsa = req.body.rsa;
            res.status(200);
            res.end(JSON.stringify({ result: "OK" }));
        } else {
            console.log(req.body);
            res.status(500);
            res.end(JSON.stringify({ result: "Set failed" }));
        }
        
    },
    getRSA: (req, res, next) => {
        console.log("Get:" + rsa)
        if (rsa == "") {
            res.status(404);
            res.end();
        } else {
            //let ret = {rsa:rsa};

            res.status(200);
            res.end(rsa);
            rsa = "";
        }
    },
    connect: (req, res, next) => {
        const { spawn } = require('child_process');
        const child = spawn('ls', );
        // use child.stdout.setEncoding('utf8'); if you want text chunks
        let ret = '';
        child.stdout.on('data', (chunk) => {
            // data from the standard output is here as buffers
            console.log(chunk.toString('utf8'));
            ret += chunk.toString('utf8');
            // res.send('<pre>' + chunk.toString('utf-8') + '</pre>');
        });
        // since these are streams, you can pipe them elsewhere
        // child.stderr.pipe(dest);
        child.stderr.on('data', (chunk)=>{
            console.log(chunk.toString('utf8'));
            // res.send('<pre>' + chunk.toString('utf-8') + '</pre>');
            ret += chunk.toString('utf8');
        });
        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            // res.send(`child process exited with code ${code}`)
            ret += `\nchild process exited with code ${code}`;
            res.send('<pre>' + ret  + '</pre>');
        });
    }
}