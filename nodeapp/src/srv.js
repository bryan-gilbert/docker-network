
const http = require('http');

const hostname = process.env.HOST;
const otherhost = process.env.OTHERHOST
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// set up a listening service
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function sendToOther() {
  console.log('Send a message from', hostname, 'to', otherhost)

  const options = {
    hostname: otherhost,
    port: port,
    path: '/',
    method: 'GET'
  }

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      console.log('RCV:', d)
    })
  })

  req.on('error', error => {
    console.error('GET ERROR', error)
  })

  req.end()
}

// Make one request of the other server
setTimeout(sendToOther, 1500);
