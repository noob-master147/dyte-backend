![img](https://bookface-images.s3.amazonaws.com/logos/7e69eded1f41ba6345f75227e93c32d796e51060.png)

# Dyte Backend Track Submition
Divyansh Khandelwal

## Steps to Start

``` 
$ git clone https://github.com/noob-master147/dyte-backend.git

$ cd backend
$ npm i
$ npm start

$ cd webhook
$ npm i 
$ npm start
```


### Sign a JWT token for your email with
`` POST http://localhost:8000/sign-jwt { email: example@gmail.com }``

Sample Response
```
{
  "statusCode": 200,
  "payload": {
    "msg": "Signed a new JWT for divyanshkhandelwal147@gmail.com",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdnlhbnNoa2hhbmRlbHdhbDE0N0BnbWFpbC5jb20iLCJpYXQiOjE2MjY1MzA5Mjh9.Y-1zJWInFGt1hVPlYeJDY3KkGlBYItvexlB-UC-vk7U"
    }
  }
}
```

### Use the JWT token in the header as ``token: <JWT Token >``

Refer to the API documentation at ``http://localhost:8000/apidoc`` after starting the servers.

You can also checkout this [file](./backend/REST.http) for sample API requests.

## Tasks completion 
- Backend Routes
    - Register  ✅
    - List  ✅
    - IP  ✅
    - Update  ✅
    - Delete  ✅
    - Authentication  ✅
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
    - dockerfile & docker-compose.yml  ✅
    - 5 retries ✅

---
Requirements
1. node.js
2. mongo
3. docker
4. docker compose