import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Toolbar, AppBar, TextField, Button } from '@mui/material';
import Card from '../Components/Card';
import { Link } from 'react-router-dom';
import api from '../Services/api';

function LivrosList() {
    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState('');
    const [buscaAtiva, setBuscaAtiva] = useState(false);

    const fetchLivros = async () => {
        try {
            const response = await api.get('/livros');
            setLivros(response.data);
        } catch (error) {
            console.error('Erro ao buscar os livros:', error);
        }
    };

    useEffect(() => {
        if (!buscaAtiva) {
            fetchLivros();
        }
    }, [buscaAtiva]);

    const handleBuscaChange = (event) => {
        setBusca(event.target.value);
    };

    const handleBuscarLivros = async () => {
        try {
            const response = await api.get(`/livros/${busca}`);
            if (Array.isArray(response.data)) {
                setLivros(response.data);
            } else {
                setLivros([response.data]);
            }
            setBuscaAtiva(true);
        } catch (error) {
            console.error('Erro ao buscar os livros:', error);
        }
    };

    const handleLimparBusca = () => {
        setBusca('');
        setBuscaAtiva(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <AppBar position="static" style={{ backgroundColor: '#324679' }}>
                    <Toolbar>
                        <Typography variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                fontFamily: 'Helvetica',
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
                <Box sx={{ mt: 4, mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Buscar Livro"
                            name="busca"
                            value={busca}
                            onChange={handleBuscaChange}
                            sx={{ width: '100%' }}
                        />
                        <Button variant="contained"
                            sx={{ width: '100px', marginRight: '8px', backgroundColor: '#324679', color: 'white' }}
                            onClick={handleBuscarLivros}>Buscar</Button>
                        <Button variant="contained"
                            sx={{ width: '100px', backgroundColor: '#324679', color: 'white' }}
                            onClick={handleLimparBusca}>Limpar</Button>

                    </Box>
                </Box>
                <Typography variant="h4" component="h4" sx={{ mt: 2, mb: 4, fontSize: '20px' }}>
                    Resultados da Busca
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {livros.map((livro) => (
                        <Grid item key={livro.id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                titulo={livro.titulo}
                                autor={livro.autor}
                                categoria={livro.categoria}
                                anoPublicacao={livro.anoPublicacao}
                                imagem={livro.imagem}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default LivrosList;
