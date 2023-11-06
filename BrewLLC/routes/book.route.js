const express =  require('express');
//const router = Router.express();
const router = express.Router();
const book = require('../controllers/book.controller');

router.post('/api/user/books', book.create);

router.get('/api/user/books', book.findAll);

router.get('/api/user/books/:bookId',book.findOne);

router.put('/api/user/books/:bookId', book.update);

router.delete('/api/user/books/:bookId', book.delete);

module.exports = router;