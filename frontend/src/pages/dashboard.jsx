import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Dashboard() {

    const [chamados, setChamados] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    async function carregarChamados() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/chamados/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setChamados(response.data);

        } catch (error) {

            console.log(error);

            alert("Erro ao carregar chamados");
        }
    }

    function logout() {

        localStorage.removeItem("token");
        window.location.href = "/";
    
    }

    function corStatus(status) {

        if (status === "aberto") {
            return "bg-yellow-100 text-yellow-700";
        }

        if (status === "resolvido") {
            return "bg-green-100 text-green-700";
        }

        return "bg-red-100 text-red-700";
    }

    async function carregarUsuario() {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://127.0.0.1:8000/api/me/",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setIsAdmin(response.data.is_admin);

    } catch (error) {

        console.log(error);
    }
}

    useEffect(() => {

        carregarChamados();
        carregarUsuario();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow-sm p-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-gray-800">
                    Meus Chamados
                </h1>

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => window.location.href = "/novo-chamado"}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Novo Chamado
                    </button>

                     {
                        isAdmin && (

                            <button
                                onClick={() => window.location.href = "/admin"}
                                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
                            >
                                Admin
                            </button>
                        )
                    }

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Sair
                    </button>

                </div>

            </header>

            <div className="p-6">

                {
                    chamados.length === 0 ? (

                        <div className="bg-white p-6 rounded-xl shadow">
                            Nenhum chamado encontrado.
                        </div>

                    ) : (

                        <div className="grid gap-4">

                            {
                                chamados.map((chamado) => (

                                    <div
                                        key={chamado.id}
                                        onClick={() => window.location.href = `/chamado/${chamado.id}`}
                                        className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
                                    >

                                        <div className="flex justify-between items-center mb-3">

                                            <h2 className="text-xl font-semibold">
                                                Chamado #{chamado.id}
                                            </h2>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${corStatus(chamado.status)}`}
                                            >
                                                {chamado.status}
                                            </span>

                                        </div>

                                        <p className="text-gray-600">
                                            {chamado.descricao}
                                        </p>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}