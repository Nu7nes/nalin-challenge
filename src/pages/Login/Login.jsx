import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import { userLogin } from "../../api/auth";
import styles from "./Login.module.css";
import persistAuthentication from "../../utils/persistAuthentication";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ hasError: false });

    useEffect(() => {
        const isAuthenticated = persistAuthentication.check();
        if (!!isAuthenticated) navigate("/");
    }, []);

    async function handleLogin(event) {
        event.preventDefault();
        setError({ hasError: false });
        setLoading(true);

        const nickname = event.target.nickname.value;
        const password = event.target.password.value;

        try {
            const response = await userLogin(nickname, password);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(data));
            }

            const { token, expires_in } = data.data[0];
            const persistence = persistAuthentication.set(token, expires_in);
            if (!persistence) {
                throw new Error(
                    JSON.stringify({ message: "Erro inesperado." })
                );
            }

            setError({ hasError: false });
            setLoading(false);
            navigate("/");
        } catch (error) {
            const errorResponse = JSON.parse(error.message);
            setError({ hasError: true, ...errorResponse });

            setLoading(false);
        }
    }

    return (
        <main className={styles.page}>
            <section className={styles.form_box}>
                <h1 className={styles.login_title}>Entrar</h1>
                <p className={styles.login_text}>
                    Bem-vindo! Por favor, insira suas credenciais para
                    continuar.
                </p>
                <form className={styles.form} onSubmit={handleLogin}>
                    <CustomInput
                        label="Apelido"
                        type="text"
                        id="nickname"
                        name="nickname"
                        placeholder="Digite seu apelido"
                        required
                    />
                    <CustomInput
                        label="Senha"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        required
                    />

                    {error.hasError && (
                        <p className={styles.error_message}>{error.message}</p>
                    )}

                    <Button
                        label="Entrar"
                        type="submit"
                        loading={loading}
                        variant="primary"
                    />
                </form>
            </section>
        </main>
    );
}
