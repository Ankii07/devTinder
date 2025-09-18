# DevTinder APIs

## AuthRouter
-POST/ signup
-POST/LOGIN
-POST/LOGOUT

## profileRouter
-GET /profile/view
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-POST /request/send/intersted/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestID
-POST /request/review/rejected/:requestID

## UserRouter
-GET/user/connections
-GET/user/requests
-GET/user/feed - Gets you the profiles of other user on platform..


Status: ignore, interseted, accepted, rejected