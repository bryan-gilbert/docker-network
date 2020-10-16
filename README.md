# Docker networking

This project sets up two docker containers each running web service and then has each
send a message to the other using the docker network DNS.

```
 docker-compose -f d-c-node.yml up --build
```
