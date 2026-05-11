const generoService = require('../services/generoService');

async function listarGeneros(request, reply) {
    try {
        const generos = await generoService.listarGeneros();
        return reply.status(200).send(generos);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao listar os géneros.' });
    }
}

async function buscarGenero(request, reply) {
    try {
        const genero = await generoService.buscarGeneroPorId(request.params.id);
        if (!genero) {
            return reply.status(404).send({ erro: 'Género não encontrado.' });
        }
        return reply.status(200).send(genero);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao buscar o género.' });
    }
}

async function cadastrarGenero(request, reply) {
    try {
        const novoGenero = await generoService.cadastrarGenero(request.body);
        return reply.status(201).send(novoGenero);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao cadastrar o género.' });
    }
}

async function alterarStatus(request, reply) {
    try {
        const { id } = request.params;
        const { status } = request.body;

        const generoAtualizado = await generoService.alterarStatusGenero(id, status);
        return reply.status(200).send(generoAtualizado);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao alterar o estado do género.' });
    }
}

module.exports = { listarGeneros, buscarGenero, cadastrarGenero, alterarStatus };