import { useEffect, useState } from "react";
import styles from "./Input.module.css";

export default function CustomInput({
    type,
    id,
    name,
    placeholder,
    label,
    isRequired,
}) {
    return (
        <div className={styles.input_box}>
            <label className={styles.input_label} htmlFor={id}>
                {label}
            </label>
            <input
                className={styles.input}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                required={isRequired}
            />
        </div>
    );
}
