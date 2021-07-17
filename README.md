![img](https://bookface-images.s3.amazonaws.com/logos/7e69eded1f41ba6345f75227e93c32d796e51060.png)

# Dyte Backend Track Submition
Divyansh Khandelwal

## Steps to Start

_Using Docker and Docker-Compose_
``` 
$ git clone https://github.com/noob-master147/dyte-backend.git

$ cd dyte-backend

$ docker rm -f $(docker ps -a -q)

$ docker-compose up --build
```
_Without Docker_
``` 
$ git clone https://github.com/noob-master147/dyte-backend.git

$ cd backend
$ npm i
$ npm start

$ cd webhook
$ npm i 
$ npm start
```


### Sign a JWT token for your email


### Use the JWT token in the header as ``token: <JWT Token >``

Refer to the API documentation at ``http://localhost:8000/apidoc`` after starting the servers.

You can also checkout this [file](./backend/REST.http) for sample requests.

## Tasks completion 
- Backend Routes
    - Register  ✅
    - List  ✅
    - IP  ✅
    - Update  ✅
    - Authentication  ✅
    - Delete  ✅
---
- Molecular Webhook Actions
    - Register  ✅
    - List  ✅
    - Trigger  ✅
    - Update  ✅
    - Delete  ✅
    - Paraller Requests  ✅
--- 
- Bonus
    - docker-compose.yml  ✅
    - 5 retries ✅