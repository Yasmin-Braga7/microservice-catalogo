const exemplarController = require('../controllers/exemplarController');

module.exports = async function (fastify, opts) {
    fastify.get('/', exemplarController.listarExemplares);
    fastify.get('/:id', exemplarController.buscarExemplar);
    fastify.post('/livro/:livroId', exemplarController.adicionarExemplar); // Atenção aqui na URL!
    fastify.patch('/:id/status', exemplarController.alterarExemplar);
};