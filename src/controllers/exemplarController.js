const exemplarService = require('../services/exemplarService');

async function listarExemplares(request, reply) {
    try {
        const exemplares = await exemplarService.listarExemplares();
        return reply.status(200).send(exemplares);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao listar exemplares.' });
    }
}

async function buscarExemplar(request, reply) {
    try {
        const exemplar = await exemplarService.buscarExemplarPorId(request.params.id);
        if (!exemplar) {
            return reply.status(404).send({ erro: 'Exemplar não encontrado.' });
        }
        return reply.status(200).send(exemplar);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao buscar o exemplar.' });
    }
}

async function adicionarExemplar(request, reply) {
    try {
        const { livroId } = request.params;
        const novoExemplar = await exemplarService.adicionarExemplar(livroId, request.body);
        return reply.status(201).send(novoExemplar);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao adicionar o exemplar ao stock.' });
    }
}

async function alterarExemplar(request, reply) {
    try {
        const { id } = request.params;
        const exemplarAtualizado = await exemplarService.alterarStatusExemplar(id, request.body);
        return reply.status(200).send(exemplarAtualizado);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao alterar os dados do exemplar.' });
    }
}

module.exports = { listarExemplares, buscarExemplar, adicionarExemplar, alterarExemplar };