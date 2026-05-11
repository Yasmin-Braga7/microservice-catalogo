const fp = require('fastify-plugin');
const prisma = require('../config/prisma'); 

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});