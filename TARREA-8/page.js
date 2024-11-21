
const http = require('http');
const port = 3007;


const server = http.createServer((req,res)=>{
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('Alejandro Alburquerque Jimenez  Num. de cuenta: 319112038');
});

server.listen(port, ()=>{
    console.log(`El servidor esta en http://localhost:${port}`);
});