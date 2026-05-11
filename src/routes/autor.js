const autorController = require('../controllers/autorController');

module.exports = async function (fastify, opts) {
    fastify.get('/', autorController.listarAutores);
    fastify.get('/:id', autorController.buscarAutor);
    fastify.post('/', autorController.cadastrarAutor);
    fastify.patch('/:id/status', autorController.alterarStatus);
};