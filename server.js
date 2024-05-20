const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(middlewares);


server.db = router.db;
server.use(auth);

server.use(router);

server.listen(8000, () => {
  console.log('JSON Server с аутентификацией работает на порте 8000');
});
