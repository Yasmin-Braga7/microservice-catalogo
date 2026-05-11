const generoController = require('../controllers/generoController');

module.exports = async function (fastify, opts) {
    fastify.get('/', generoController.listarGeneros);
    fastify.get('/:id', generoController.buscarGenero);
    fastify.post('/', generoController.cadastrarGenero);
    fastify.patch('/:id/status', generoController.alterarStatus);
};