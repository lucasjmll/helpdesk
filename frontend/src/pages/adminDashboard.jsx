import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

    const [chamados, setChamados] = useState([]);

    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos");

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

    function corStatus(status) {

        if (status === "aberto") {
            return "bg-yellow-100 text-yellow-700";
        }

        if (status === "resolvido") {
            return "bg-green-100 text-green-700";
        }

        return "bg-red-100 text-red-700";
    }

    useEffect(() => {

        carregarChamados();

    }, []);

    const chamadosFiltrados = chamados.filter((chamado) => {

        const descricaoMatch = chamado.descricao
            .toLowerCase()
            .includes(busca.toLowerCase());

        const statusMatch =
            filtroStatus === "todos"
            || chamado.status === filtroStatus;

        return descricaoMatch && statusMatch;
    });

    return (

        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow-sm p-4">

                <div className="flex justify-between items-center">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Painel Administrativo
                    </h1>

                    <div className="flex gap-3">

                        <button
                            onClick={() => window.location.href = "/novo-chamado"}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                        >
                            Novo Chamado
                        </button>

                        <button
                            onClick={() => window.location.href = "/admin/categorias"}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Categorias
                        </button>

                        <button
                            onClick={() => window.location.href = "/admin/locais"}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                            Locais
                        </button>

                        <button
                            onClick={() => window.location.href = "/admin/usuarios"}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                        >
                            Usuários
                        </button>

                    </div>

                </div>

            </header>


            <div className="p-6">

                <div className="bg-white rounded-2xl shadow p-4 mb-6">

                    <input
                        type="text"
                        placeholder="Buscar chamado..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                    />

                    <div className="flex gap-3 flex-wrap">

                        <button
                            onClick={() => setFiltroStatus("todos")}
                            className={`px-4 py-2 rounded-lg ${
                                filtroStatus === "todos"
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Todos
                        </button>

                        <button
                            onClick={() => setFiltroStatus("aberto")}
                            className={`px-4 py-2 rounded-lg ${
                                filtroStatus === "aberto"
                                    ? "bg-yellow-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Abertos
                        </button>

                        <button
                            onClick={() => setFiltroStatus("resolvido")}
                            className={`px-4 py-2 rounded-lg ${
                                filtroStatus === "resolvido"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Resolvidos
                        </button>

                        <button
                            onClick={() => setFiltroStatus("fechado")}
                            className={`px-4 py-2 rounded-lg ${
                                filtroStatus === "fechado"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Fechados
                        </button>

                    </div>

                </div>

                <div className="grid gap-4">

                    {
                        chamadosFiltrados.map((chamado) => (

                            <div
                                key={chamado.id}
                                onClick={() => window.location.href = `/chamado/${chamado.id}`}
                                className="bg-white p-5 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
                            >

                                <div className="flex justify-between items-center mb-3">

                                    <div>

                                        <h2 className="text-xl font-semibold">
                                            Chamado #{chamado.id}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Usuário:
                                            {" "}
                                            {chamado.usuario_nome}
                                        </p>

                                    </div>

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

            </div>

        </div>
    );
}