import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CardBook from '../Components/CardBook';
import api from '../Services/api';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  anoPublicacao: number;
  imagem: string;
}

function PaginaPrincipal() {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await api.get('/livrosDisponiveis');
        setLivros(response.data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    fetchLivros();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
          Livros Disponíveis para Alugar
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {livros.map((livro: Livro) => (
            <Grid item key={livro.id} xs={12} sm={6} md={4} lg={3}>
              <CardBook
                titulo={livro.titulo}
                autor={livro.autor}
                genero={livro.genero}
                anoPublicacao={livro.anoPublicacao}
                imagem={livro.imagem}
                livroId={livro.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ position: 'fixed', bottom: '20px', width: '100%', textAlign: 'center' }}>
        <Typography variant="body1" sx={{ color: '#666' }}>
          © 2024 Bibliotech. Todos os direitos reservados.
        </Typography>
      </Box>
    </div>
  );
}

export default PaginaPrincipal;
