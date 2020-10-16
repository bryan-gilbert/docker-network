# Docker networking

This project sets up two docker containers each running web service and then has each
send a message to the other using the docker network DNS.

```
 docker-compose -f d-c-node.yml up --build
```
The two services will start on different ports and different host names 
(relative to the docker internal network).  Each server will send the other
a single request.

```
...
Attaching to docker-network_nodeapp2_1, docker-network_nodeapp1_1
nodeapp1_1  | 
nodeapp1_1  | > nodeapp@1.0.0 start /
nodeapp1_1  | > node src/srv.js
nodeapp1_1  | 
nodeapp2_1  | 
nodeapp2_1  | > nodeapp@1.0.0 start /
nodeapp2_1  | > node src/srv.js
nodeapp2_1  | 
nodeapp1_1  | Server running at http://nodeapp1:3001/
nodeapp2_1  | Server running at http://nodeapp2:3002/
nodeapp1_1  | Send a message from nodeapp1 to nodeapp2
nodeapp1_1  | statusCode: 200
nodeapp1_1  | RCV (nodeapp1): Hello from nodeapp2
nodeapp1_1  | 
nodeapp2_1  | Send a message from nodeapp2 to nodeapp1
nodeapp2_1  | statusCode: 200
nodeapp2_1  | RCV (nodeapp2): Hello from nodeapp1
nodeapp2_1  | 
```


Once it is up and running you can send a request from the host into either container. E.g.
```
curl http://localhost:3002
```
