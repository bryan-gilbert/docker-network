
const http = require('http');

const hostname = process.env.HOST;
const port = process.env.PORT;

const otherhost = process.env.OTHERHOST
const otherport = process.env.OTHERPORT

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from ' + hostname + '\n');
});

// set up a listening service
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function sendToOther() {
  console.log('Send a message from', hostname, 'to', otherhost)

  const options = {
    hostname: otherhost,
    port: otherport,
    path: '/',
    method: 'GET',
    headers: {
      'Accept-Charset': 'utf-8',
    }
  }
  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function () {
      console.log('RCV (' + hostname + '):', data);
    });
  })

  req.on('error', error => {
    console.error('GET ERROR', error)
  })

  req.end()
}

// Make one request of the other server
setTimeout(sendToOther, 1500);
