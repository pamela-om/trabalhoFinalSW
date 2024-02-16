import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Snackbar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import TabelaEmprestimos from '../Components/Tabela';
import axios from 'axios';

function EmprestimosList() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const [, payloadBase64] = token.split('.');
                if (payloadBase64) {
                    const payload = JSON.parse(atob(payloadBase64));
                    const idCliente = payload.id;
                    fetchEmprestimosCliente(idCliente);
                }
            } catch (error) {
                console.error('Erro ao decodificar o payload do token:', error);
            }
        }
    }, []);

    const fetchEmprestimosCliente = async (idCliente) => {
        try {
            const response = await fetch(`http://localhost:5000/emprestimos/cliente/${idCliente}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os empréstimos');
            }
            const data = await response.json();
            setEmprestimos(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    const handleDevolverLivro = async (emprestimoId) => {
        try {
            const response = await axios.patch('http://localhost:5000/emprestimos/devolucao', { id: emprestimoId });
            console.log(response.data); // Exemplo de como tratar a resposta, se necessário
            // Atualizar o estado de empréstimos após a devolução do livro
            setEmprestimos(prevEmprestimos => prevEmprestimos.map(emprestimo => {
                if (emprestimo.id === emprestimoId) {
                    return { ...emprestimo, ativo: false };
                }
                return emprestimo;
            }));
            setOpenAlert(true); // Abrir o alerta de sucesso
        } catch (error) {
            console.error('Erro ao devolver o livro:', error);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <div style={{ fontFamily: 'Roboto', backgroundColor: '#f0f0f0', minHeight: '100vh', paddingBottom: '50px' }}>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <AppBar position="static" style={{ backgroundColor: '#324679' }}>
                    <Toolbar>
                        <Typography variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginRight: '30px',
                            }}
                        >
                            Biblioteca Online
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontFamily: 'Helvetica' }}>
                            <Link to="/paginaPrincipal" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button key="Principal" sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Página Inicial
                                </Button>
                            </Link>
                            <Link to="/livros" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button key="Livros" sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Livros
                                </Button>
                            </Link>
                            <Link to="/emprestimos" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button key="Emprestimos" sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Meus Empréstimos
                                </Button>
                            </Link>
                        </Box>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 4, fontSize: '36px', fontWeight: 'bold', color: '#324679' }}>
                    Lista de Empréstimos
                </Typography>
                <TabelaEmprestimos emprestimos={emprestimos} onDevolverLivro={handleDevolverLivro} />
            </Container>
            <Box sx={{ position: 'fixed', bottom: '20px', width: '100%', textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    © 2024 Sua Aplicação. Todos os direitos reservados.
                </Typography>
            </Box>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                message="Livro devolvido com sucesso!"
            />
        </div>
    );
}

export default EmprestimosList;
