const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const rabbitmq = require('../config/rabbitmq');

async function listarLivros() {
    return await prisma.livro.findMany({
        include: { autores: true, generos: true }
    });
}

async function buscarLivroPorId(id) {
    return await prisma.livro.findUnique({
        where: { id: Number(id) },
        include: { exemplares: true, autores: true, generos: true }
    });
}

async function cadastrarLivro(dados) {
    const novoLivro = await prisma.livro.create({
        data: {
            titulo: dados.titulo,
            isbn: dados.isbn,
            editora: dados.editora,
            anoPublicacao: dados.anoPublicacao,
            sinopse: dados.sinopse,
            numeroPaginas: dados.numeroPaginas,
            idioma: dados.idioma,
            status: 1
            // Nota: Caso venham os arrays de IDs na requisição, 
            // você pode conectar autores e gêneros aqui usando o "connect".
        }
    });

    // Emite evento para outros microsserviços
    await rabbitmq.publish(rabbitmq.EVENTS.LIVRO_CRIADO, {
        livroId: novoLivro.id,
        titulo: novoLivro.titulo,
        isbn: novoLivro.isbn
    });

    return novoLivro;
}

async function alterarStatusLivro(id, status) {
    const livroAtualizado = await prisma.livro.update({
        where: { id: Number(id) },
        data: { status: Number(status) }
    });

    // Importante: avisa a todos que o livro mudou (ex: se foi inativado, a Reserva bloqueia)
    await rabbitmq.publish(rabbitmq.EVENTS.LIVRO_ALTERADO, {
        livroId: livroAtualizado.id,
        status: livroAtualizado.status
    });

    return livroAtualizado;
}

module.exports = { listarLivros ,buscarLivroPorId, cadastrarLivro, alterarStatusLivro };