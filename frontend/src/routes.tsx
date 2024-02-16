import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaPrincipal from "../Pages/PaginaPrincipal.tsx";
import LivrosList from "../Pages/LivrosList.jsx";
import Login from "../Pages/Login.jsx";
import Cadastro from "../Pages/Cadastro.jsx";
import EmprestimosList from "../Pages/EmprestimosList.jsx";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/paginaPrincipal"
                    element={<PaginaPrincipal />}
                />

                <Route
                    path="/livros"
                    element={<LivrosList />}
                />

                <Route
                    path="/cadastro"
                    element={<Cadastro />}
                />

                <Route
                    path="/emprestimos"
                    element={<EmprestimosList />}
                />
            </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes;