import { useNavigate } from "react-router-dom";

export default function Header({ titulo, voltar = true, acoes }) {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (

        <header className="bg-white shadow-sm px-6 py-4 mb-6">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <div className="flex items-center gap-3">

                    {
                        voltar && (
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                            >
                                Voltar
                            </button>
                        )
                    }

                    <h1 className="text-2xl font-bold text-gray-800">
                        {titulo}
                    </h1>

                </div>

                <div className="flex items-center gap-3">

                    {acoes}

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Sair
                    </button>

                </div>

            </div>

        </header>
    );
}