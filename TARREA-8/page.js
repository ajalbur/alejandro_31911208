
const http = require('http');
const port = 3007;


const server = http.createServer((req,res)=>{
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('Miguel Angel Juarez Nicolas  Num. de cuenta: 31831610-9');
});

server.listen(port, ()=>{
    console.log(`El servidor esta en http://localhost:${port}`);
});