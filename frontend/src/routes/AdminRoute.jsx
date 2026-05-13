import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        async function verificarAdmin() {

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

            setLoading(false);
        }

        verificarAdmin();

    }, []);

    if (loading) {

        return (
            <div className="p-6">
                Carregando...
            </div>
        );
    }

    if (!isAdmin) {

        window.location.href = "/dashboard";

        return null;
    }

    return children;
}