This app is a nodejs API (nodejs / express / MongoDB).

To properly run the app :

Create a .env file with these environment variables :
PORT=9000
SECRET=YOUR_SECRET
DATABASE_URL=YOUR_MONGO_DB_URL


Go to /mini_test
- npm install
- npm install nodemon
- npm start (=> run the app server on http://localhost:9000)

<!-- Go to /earthcube/client
- npm install
- npm start (=> run the app frontend on http://localhost:3000)
 -->

The API provide routes for differents clients :
- users:
http://localhost:9000/user/signup POST with data body
http://localhost:9000/user/login POST with data body
http://localhost:9000/user/logout POST with token in headers
http://localhost:9000/order/create POST with token in headers and data body

- mini-FACTORY
http://localhost:9000/order/untreated GET
http://localhost:9000/order/update PUT with data body
