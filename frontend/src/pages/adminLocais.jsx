import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LocaisAdmin() {

    const navigate = useNavigate();

    const [locais, setLocais] = useState([]);
    const [nome, setNome] = useState("");

    async function carregarLocais() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/locais/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLocais(response.data);

        } catch (error) {

            console.log(error);
            alert("Erro ao carregar locais");
        }
    }

    async function criarLocal(e) {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://127.0.0.1:8000/api/locais/",
                { nome },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNome("");
            carregarLocais();

        } catch (error) {

            console.log(error);
            alert("Erro ao criar local");
        }
    }

    async function excluirLocal(id) {

        const confirmar = window.confirm(
            "Deseja realmente excluir este local?"
        );

        if (!confirmar) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://127.0.0.1:8000/api/locais/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            carregarLocais();

        } catch (error) {

            console.log(error);
            alert("Erro ao excluir local");
        }
    }

    useEffect(() => {
        carregarLocais();
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

                <div className="max-w-4xl mx-auto">

                    {/* FORM */}
                    <div className="bg-white rounded-2xl shadow p-6 mb-6">

                        <h1 className="text-2xl font-bold mb-4">
                            Gestão de Locais
                        </h1>

                        <form
                            onSubmit={criarLocal}
                            className="flex gap-3"
                        >

                            <input
                                type="text"
                                placeholder="Nome do local"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg p-3"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
                            >
                                Criar
                            </button>

                        </form>

                    </div>

                    {/* LISTA */}
                    <div className="space-y-4">

                        {locais.map((local) => (

                            <div
                                key={local.id}
                                className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
                            >

                                <h2 className="text-xl font-semibold">
                                    {local.nome}
                                </h2>

                                <button
                                    onClick={() => excluirLocal(local.id)}
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