import { useEffect, useState } from "react";
import CustomButton from "../Button/Button";
import styles from "./Pagination.module.css";

export default function Pagination({ total, current, onHandleChange }) {
    const [pagesView, setPagesView] = useState([total]);

    useEffect(() => {
        const pages = Object.keys(new Array(total).fill(null)).map(
            (it) => Number(it) + 1
        );

        const slicedPages = pages.slice(
            current <= 2 ? 0 : current - 2,
            current >= total ? total : current + 1
        );

        if (current > 2) slicedPages.unshift(1);
        if (current < total - 1) slicedPages.push(total);

        setPagesView(slicedPages);
    }, [current, total]);

    function handleChangePage({ target }) {
        onHandleChange(target.id);
    }

    return (
        <div className={styles.box}>
            {pagesView.map((it) => (
                <CustomButton
                    key={it}
                    id={it}
                    type="button"
                    variant={it === current ? "page_active" : "page"}
                    label={it}
                    onClick={handleChangePage}
                />
            ))}
        </div>
    );
}
