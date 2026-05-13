import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DetalheChamado() {

    const { id } = useParams();

    const [chamado, setChamado] = useState(null);
    const [novoStatus, setNovoStatus] = useState("");
    const [observacao, setObservacao] = useState("");

    const navigate = useNavigate();
    
    async function carregarChamado() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://127.0.0.1:8000/api/chamados/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setChamado(response.data);

        } catch (error) {

            console.log(error);

            alert("Erro ao carregar chamado");
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

    async function atualizarChamado(e) {

            e.preventDefault();

            try {

                const token = localStorage.getItem("token");

                await axios.post(
                    `http://127.0.0.1:8000/api/chamados/${id}/atualizar_status/`,
                {
                status: novoStatus,
                observacao
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Chamado atualizado!");

            carregarChamado();

            setNovoStatus("");
            setObservacao("");

        } catch (error) {

            console.log(error);

            alert("Erro ao atualizar chamado");
          }
        }

    async function excluirChamado() {

    const confirmar = window.confirm(
        "Deseja realmente apagar este chamado?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        await axios.delete(
            `http://127.0.0.1:8000/api/chamados/${id}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Chamado apagado com sucesso!");

        window.location.href = "/dashboard";

    } catch (error) {

        console.log(error);

        alert("Erro ao apagar chamado");
    }
}    

    useEffect(() => {

        carregarChamado();

    }, []);

    if (!chamado) {

        return (
            <div className="p-6">
                Carregando...
            </div>
        );
    }

    return (

    <div className="min-h-screen bg-gray-100">

        {/* TOPO COM VOLTAR */}
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

                <div className="bg-white rounded-2xl shadow p-6 mb-6">

                    <div className="flex justify-between items-center mb-4">

                        <h1 className="text-3xl font-bold">
                            Chamado #{chamado.id}
                        </h1>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${corStatus(chamado.status)}`}
                        >
                            {chamado.status}
                        </span>

                    </div>

                    <div className="space-y-3">

                        <p>
                            <strong>Descrição:</strong> {chamado.descricao}
                        </p>

                        <p>
                            <strong>Categoria:</strong> {chamado.categoria_nome}
                        </p>

                        <p>
                            <strong>Local:</strong> {chamado.local_nome}
                        </p>

                        <p>
                            <strong>Criado em:</strong>{" "}
                            {new Date(chamado.criado_em).toLocaleString()}
                        </p>

                    </div>

                    <button
                        onClick={excluirChamado}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                    >
                        Excluir Chamado
                    </button>

                </div>

                <div className="bg-white rounded-2xl shadow p-6 mb-6">

                    <h2 className="text-2xl font-bold mb-4">
                        Atualizar Chamado
                    </h2>

                    <form
                        onSubmit={atualizarChamado}
                        className="space-y-4"
                    >

                        <select
                            value={novoStatus}
                            onChange={(e) => setNovoStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3"
                            required
                        >

                            <option value="">
                                Selecione um status
                            </option>

                            <option value="aberto">Aberto</option>
                            <option value="resolvido">Resolvido</option>
                            <option value="fechado">Fechado</option>

                        </select>

                        <textarea
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                            placeholder="Observações..."
                            className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            Atualizar Chamado
                        </button>

                    </form>

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Atualizações
                    </h2>

                    {chamado.atualizacoes.length === 0 ? (

                        <p className="text-gray-500">
                            Nenhuma atualização encontrada.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {chamado.atualizacoes.map((atualizacao) => (

                                <div
                                    key={atualizacao.id}
                                    className="border-l-4 border-blue-500 pl-4 py-2"
                                >

                                    <div className="flex justify-between">

                                        <strong>
                                            {atualizacao.administrador_nome}
                                        </strong>

                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                atualizacao.criado_em
                                            ).toLocaleString()}
                                        </span>

                                    </div>

                                    <p className="mt-2 text-gray-700">
                                        {atualizacao.observacao}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    </div>
);
}