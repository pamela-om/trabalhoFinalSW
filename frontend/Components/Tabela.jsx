import React, { useEffect, useState, useCallback } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

function Tabela({ emprestimos, onDevolverLivro }) {
    const [emprestimosComNomesLivros, setEmprestimosComNomesLivros] = useState([]);
    const formatarData = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    };

    const buscarNomesLivros = useCallback(async () => {
        try {
            const emprestimosComNomes = await Promise.all(
                emprestimos.map(async (emprestimo) => {
                    const response = await fetch(`http://localhost:5000/livros/emprestimo/${emprestimo.livro_id}`);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar nome do livro');
                    }
                    const { nomeLivro } = await response.json();
                    return { ...emprestimo, nomeLivro: nomeLivro};
                })
            );
            setEmprestimosComNomesLivros(emprestimosComNomes);
        } catch (error) {
            console.error('Erro ao buscar nomes dos livros:', error);
        }
    }, [emprestimos]); 

    useEffect(() => {
        buscarNomesLivros();
    }, [buscarNomesLivros]); // Dependência buscarNomesLivros

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Lista de empréstimos">
                <TableHead>
                    <TableRow>
                        <TableCell>Livro</TableCell>
                        <TableCell>Data de Empréstimo</TableCell>
                        <TableCell>Data de Devolução</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {emprestimosComNomesLivros.map((emprestimo) => (
                        <TableRow key={emprestimo.id}>
                            <TableCell>{emprestimo.nomeLivro}</TableCell>
                            <TableCell>{formatarData(emprestimo.dataEmprestimo)}</TableCell>
                            <TableCell>{formatarData(emprestimo.dataDevolucao)}</TableCell>
                            <TableCell>{emprestimo.ativo ? 'Ativo' : 'Devolvido'}</TableCell>
                            <TableCell>
                                {emprestimo.ativo && (
                                    <Button onClick={() => onDevolverLivro(emprestimo.id)} variant="contained">Devolver</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Tabela;
