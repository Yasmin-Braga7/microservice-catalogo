const autorService = require('../services/autorService');

async function listarAutores(request, reply) {
    try {
        const autores = await autorService.listarAutores();
        return reply.status(200).send(autores);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao listar os autores.' });
    }
}

async function buscarAutor(request, reply) {
    try {
        const autor = await autorService.buscarAutorPorId(request.params.id);
        if (!autor) {
            return reply.status(404).send({ erro: 'Autor não encontrado.' });
        }
        return reply.status(200).send(autor);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao buscar o autor.' });
    }
}

async function cadastrarAutor(request, reply) {
    try {
        const novoAutor = await autorService.cadastrarAutor(request.body);
        return reply.status(201).send(novoAutor);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao cadastrar o autor.' });
    }
}

async function alterarStatus(request, reply) {
    try {
        const { id } = request.params;
        const { status } = request.body;

        const autorAtualizado = await autorService.alterarStatusAutor(id, status);
        return reply.status(200).send(autorAtualizado);
    } catch (error) {
        return reply.status(500).send({ erro: 'Erro ao alterar o estado do autor.' });
    }
}

module.exports = { listarAutores, buscarAutor, cadastrarAutor, alterarStatus };