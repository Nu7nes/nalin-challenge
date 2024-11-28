import { useEffect, useState } from "react";
import styles from "./ProductsList.module.css";
import Pagination from "../../../components/Pagination/Pagination";
import CustomInput from "../../../components/Input/Input";
import CustomSelect from "../../../components/Select/Select";

export default function ProductsList({ list, loading }) {
    const [adjustedList, setAdjustedList] = useState([]);
    const [paginationSetup, setPaginationSetup] = useState({
        current: 1,
        total: 1,
        itemsPerPage: 10,
    });

    useEffect(() => {
        const itemsCount = list.length;
        const divisioReminder = itemsCount % paginationSetup.itemsPerPage;
        const pagesCount =
            (itemsCount - divisioReminder) / paginationSetup.itemsPerPage +
            (divisioReminder > 0 ? 1 : 0);

        setPaginationSetup({
            ...paginationSetup,
            total: pagesCount < 1 ? 1 : pagesCount,
        });

        const lastItem = paginationSetup.current * paginationSetup.itemsPerPage;
        const firstItem =
            paginationSetup.current * paginationSetup.itemsPerPage -
            paginationSetup.itemsPerPage;

        const slicedList = list.slice(firstItem, lastItem);
        if (slicedList.length < 1)
            setPaginationSetup({ ...paginationSetup, current: 1 });

        setAdjustedList(slicedList);
    }, [list, paginationSetup.current, paginationSetup.itemsPerPage]);

    return loading ? (
        <p className={styles.loading_message}>Carregando...</p>
    ) : (
        <div className={`container ${styles.box}`}>
            <table className={styles.table}>
                <thead>
                    <tr className={`${styles.item} ${styles.headItem}`}>
                        <th>Cód.</th>
                        <th>Nome</th>
                        <th>Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    {adjustedList.map((item, index) => (
                        <tr key={index} className={styles.item}>
                            <th>{item.codigo}</th>
                            <td>{item.descricao}</td>
                            <td>{item.departamento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className={styles.navigation}>
                <Pagination
                    current={paginationSetup.current}
                    total={paginationSetup.total}
                    onHandleChange={(page) =>
                        setPaginationSetup({
                            ...paginationSetup,
                            current: Number(page),
                        })
                    }
                />
                <CustomSelect
                    label={"Itens por página:"}
                    options={[10, 30, 50]}
                    onHandleChange={(count) =>
                        setPaginationSetup({
                            ...paginationSetup,
                            itemsPerPage: Number(count),
                        })
                    }
                />
            </nav>
        </div>
    );
}
