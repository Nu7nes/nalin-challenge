import styles from "./Button.module.css";

export default function CustomButton({
    label,
    type,
    loading,
    variant,
    onClick,
    id,
}) {
    return (
        <button
            disabled={loading}
            id={id || null}
            className={`${styles.button} ${
                variant ? styles[variant] : styles.primary
            }`}
            type={type}
            onClick={onClick}
        >
            {loading && type !== "reset" ? "Aguarde..." : label}
        </button>
    );
}
