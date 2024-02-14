import { prisma } from '../../database/client.js';

export class DesativarEmprestimoController {
  async handle(request, response) {
    const { id } = request.body;

    // Encontrar o empréstimo correspondente pelo ID
    const emprestimo = await prisma.emprestimo.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!emprestimo) {
      return response.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    // Verificar se o empréstimo já está finalizado
    if (!emprestimo.ativo) {
      return response.status(400).json({ error: 'Empréstimo já finalizado' });
    }

    // Encontrar o livro correspondente pelo ID do empréstimo
    const livro = await prisma.livro.findUnique({
      where: {
        id: emprestimo.livro_id
      }
    });

    if (!livro) {
      return response.status(404).json({ error: 'Livro não encontrado' });
    }

    // Atualizar o status de disponibilidade do livro para true
    await prisma.livro.update({
      where: {
        id: livro.id
      },
      data: {
        disponivel: true
      }
    });

    // Atualizar o empréstimo como finalizado
    const updatedEmprestimo = await prisma.emprestimo.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ativo: false // Empréstimo finalizado
      }
    });

    return response.json(updatedEmprestimo);
  }
}
