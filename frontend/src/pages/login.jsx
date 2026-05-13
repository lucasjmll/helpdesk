import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/api/login/",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.access
            );

            window.location.href = "/dashboard";

        } catch (error) {

            alert("Usuário ou senha inválidos");
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-80"
            >

                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    HelpDesk
                </h1>

                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
                >
                    Entrar
                </button>

            </form>

        </div>
    );
}