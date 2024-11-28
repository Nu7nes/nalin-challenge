import { useEffect, useState } from "react";
import styles from "./Select.module.css";

export default function CustomSelect({
    type,
    id,
    name,
    placeholder,
    label,
    options,
    onHandleChange,
}) {
    function handleChange({ target }) {
        onHandleChange(target.value);
    }

    return (
        <div className={styles.input_box}>
            <label className={styles.input_label} htmlFor={id}>
                {label}
            </label>
            <select
                className={styles.input}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
            >
                {options.map((it) => (
                    <option key={"opt_" + it} value={it}>
                        {it}
                    </option>
                ))}
            </select>
        </div>
    );
}
