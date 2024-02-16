import { prisma } from '../../database/client.js';

export class GetAllLivroController {
    async handle(request, response) {
        try {
            const { titulo, genero, autor } = request.query;

            const filtro = {
                where: {
                    titulo: { contains: titulo || '' },
                    genero: { contains: genero || '' },
                    autor: { contains: autor || '' },
                },
            };

            const livros = await prisma.livro.findMany(filtro);

            return response.json(livros);
        } catch (error) {
            console.error('Erro ao buscar os livros:', error);
            return response.status(500).json({ error: 'Erro ao buscar os livros' });
        }
    }
}
