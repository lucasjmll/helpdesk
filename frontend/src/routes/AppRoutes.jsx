import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import NovoChamado from "../pages/novoChamado";
import DetalheChamado from "../pages/detalheChamado";
import AdminDashboard from "../pages/adminDashboard";
import CategoriasAdmin from "../pages/adminCategorias";
import LocaisAdmin from "../pages/adminLocais";
import UsuariosAdmin from "../pages/adminUsuarios";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/novo-chamado"
                    element={
                        <PrivateRoute>
                            <NovoChamado />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/chamado/:id"
                    element={
                        <PrivateRoute>
                            <DetalheChamado />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/categorias"
                    element={
                        <AdminRoute>
                            <CategoriasAdmin />
                        </AdminRoute>
                    }
                />
                
                <Route
                    path="/admin/locais"
                    element={
                        <AdminRoute>
                            <LocaisAdmin />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/usuarios"
                    element={
                        <AdminRoute>
                            <UsuariosAdmin />
                        </AdminRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}