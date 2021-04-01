const express = require('express');

const StatusController = require('./controllers/StatusController');
const CardsController = require('./controllers/CardsController');


const routes = express.Router();


routes.get('/status', StatusController.index);
routes.post('/status', StatusController.create);


routes.get('/cards', CardsController.index);
routes.post('/cards', CardsController.create);
routes.delete('/cards/:id', CardsController.delete);

module.exports = routes;