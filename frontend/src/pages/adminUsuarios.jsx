import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UsuariosAdmin() {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);

    const [form, setForm] = useState({
        username: "",
        email: "",
        cpf: "",
        matricula: "",
        password: "",
        is_admin: false
    });

    async function carregarUsuarios() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/usuarios/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsuarios(response.data);

        } catch (error) {

            console.log(error);
        }
    }

    async function criarUsuario(e) {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://127.0.0.1:8000/api/usuarios/",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setForm({
                username: "",
                email: "",
                cpf: "",
                matricula: "",
                password: "",
                is_admin: false
            });

            carregarUsuarios();

        } catch (error) {

            console.log(error);
            alert("Erro ao criar usuário");
        }
    }

    async function excluirUsuario(id) {

        const confirmar = window.confirm(
            "Deseja excluir este usuário?"
        );

        if (!confirmar) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://127.0.0.1:8000/api/usuarios/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            carregarUsuarios();

        } catch (error) {

            console.log(error);
            alert("Erro ao excluir usuário");
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* BOTÃO VOLTAR */}
            <div className="p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                >
                    Voltar
                </button>
            </div>

            <div className="p-6">

                <div className="max-w-5xl mx-auto">

                    {/* FORM */}
                    <div className="bg-white rounded-2xl shadow p-6 mb-6">

                        <h1 className="text-2xl font-bold mb-4">
                            Gestão de Usuários
                        </h1>

                        <form
                            onSubmit={criarUsuario}
                            className="grid grid-cols-2 gap-4"
                        >

                            <input
                                type="text"
                                placeholder="Usuário"
                                value={form.username}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        username: e.target.value
                                    })
                                }
                                className="border border-gray-300 rounded-lg p-3"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value
                                    })
                                }
                                className="border border-gray-300 rounded-lg p-3"
                                required
                            />

                            <input
                                type="text"
                                placeholder="CPF"
                                value={form.cpf}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        cpf: e.target.value
                                    })
                                }
                                className="border border-gray-300 rounded-lg p-3"
                            />

                            <input
                                type="text"
                                placeholder="Matrícula"
                                value={form.matricula}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        matricula: e.target.value
                                    })
                                }
                                className="border border-gray-300 rounded-lg p-3"
                            />

                            <input
                                type="password"
                                placeholder="Senha"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    })
                                }
                                className="border border-gray-300 rounded-lg p-3"
                                required
                            />

                            <label className="flex items-center gap-2">

                                <input
                                    type="checkbox"
                                    checked={form.is_admin}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            is_admin: e.target.checked
                                        })
                                    }
                                />

                                Administrador

                            </label>

                            <button
                                type="submit"
                                className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                            >
                                Criar Usuário
                            </button>

                        </form>

                    </div>

                    {/* LISTA */}
                    <div className="space-y-4">

                        {usuarios.map((usuario) => (

                            <div
                                key={usuario.id}
                                className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
                            >

                                <div>

                                    <h2 className="text-xl font-semibold">
                                        {usuario.username}
                                    </h2>

                                    <p className="text-gray-500">
                                        Matrícula: {usuario.matricula}
                                    </p>

                                    <p className="text-gray-500">
                                        Admin: {usuario.is_admin ? "Sim" : "Não"}
                                    </p>

                                </div>

                                <button
                                    onClick={() => excluirUsuario(usuario.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Excluir
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}