import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NovoChamado() {

    const [categorias, setCategorias] = useState([]);
    const [locais, setLocais] = useState([]);

    const [categoria, setCategoria] = useState("");
    const [local, setLocal] = useState("");
    const [descricao, setDescricao] = useState("");

    const navigate = useNavigate();
    
    async function carregarDados() {

        try {

            const token = localStorage.getItem("token");

            const categoriasResponse = await axios.get(
                "http://127.0.0.1:8000/api/categorias/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const locaisResponse = await axios.get(
                "http://127.0.0.1:8000/api/locais/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCategorias(categoriasResponse.data);
            setLocais(locaisResponse.data);

        } catch (error) {

            console.log(error);

            alert("Erro ao carregar dados");
        }
    }

    async function criarChamado(e) {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://127.0.0.1:8000/api/chamados/",
                {
                    categoria,
                    local,
                    descricao
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Chamado criado com sucesso!");

            window.location.href = "/dashboard";

        } catch (error) {

            console.log(error);

            alert("Erro ao criar chamado");
        }
    }

    useEffect(() => {

        carregarDados();

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

        {/* FORM CENTRALIZADO */}
        <div className="flex items-center justify-center p-4">

            <form
                onSubmit={criarChamado}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
            >

                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Novo Chamado
                </h1>

                <div className="mb-4">

                    <label className="block mb-2 font-medium">
                        Categoria
                    </label>

                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        required
                    >

                        <option value="">
                            Selecione uma categoria
                        </option>

                        {
                            categorias.map((cat) => (

                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.nome}
                                </option>
                            ))
                        }

                    </select>

                </div>

                <div className="mb-4">

                    <label className="block mb-2 font-medium">
                        Local
                    </label>

                    <select
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3"
                        required
                    >

                        <option value="">
                            Selecione um local
                        </option>

                        {
                            locais.map((loc) => (

                                <option
                                    key={loc.id}
                                    value={loc.id}
                                >
                                    {loc.nome}
                                </option>
                            ))
                        }

                    </select>

                </div>

                <div className="mb-6">

                    <label className="block mb-2 font-medium">
                        Descrição
                    </label>

                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
                        placeholder="Descreva o problema..."
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
                >
                    Abrir Chamado
                </button>

            </form>

        </div>

    </div>
);
}