# authRouter

- POST /signin
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter

- POST /request/send/interested/:useridd
- POST /requst/send/ignored/:userid
- POST /request/review/accepted/:userid
- POST /requst/review/rejected/:userid

# userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed