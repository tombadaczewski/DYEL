# DYEL

To run:

```javascript
npm install
gulp serve
```

Go to ```localhost:3000``` to view the api.

## Auth routes
POST: /auth/register
```javascript
{
    "username": "yourUserName",
    "password": "yourPassword"
}
```

POST: /auth/authenticate
```javascript
{
    "username": "yourUserName",
    "password": "yourPassword"
}
```
returns a json web token

GET: /auth/getme

Header: x-access-token : json web token