import CustomButton from "../Button/Button";
import styles from "./Header.module.css";
import persistAuthentication from "../../utils/persistAuthentication";
import { useNavigate } from "react-router-dom";

export default function CustomHeader() {
    const navigate = useNavigate();

    function handleLogout() {
        persistAuthentication.clear();
        navigate("/login", { replace: true });
    }

    return (
        <div className={styles.container}>
            <header className={`container ${styles.header}`}>
                <p className={styles.logo}>Nalin - Estágio</p>
                <nav>
                    <CustomButton
                        label="Sair"
                        type="button"
                        variant="secondary"
                        onClick={handleLogout}
                    />
                </nav>
            </header>
        </div>
    );
}
