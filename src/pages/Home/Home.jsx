import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import FiltersBox from "./FiltersBox/FiltersBox";
import { getProducts } from "../../api/products";
import CustomHeader from "../../components/Header/Header";
import ProductsList from "./ProductsList/ProductsList";

export default function Home() {
    const [filters, setFilters] = useState({
        code: "",
        department: "",
        name: "",
    });
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ hasError: false });

    useEffect(() => {
        setLoading(true);
        setError({ hasError: false });

        (async function () {
            try {
                const response = await getProducts(
                    filters.code,
                    filters.department
                );

                const { data } = await response.json();

                if (!response.ok) {
                    throw new Error(JSON.stringify(data));
                }

                setLoading(false);

                if (!data.length)
                    throw new Error(
                        JSON.stringify({ message: "Nenhum item encontrado!" })
                    );

                if (!filters.name) return setProductsList(data);

                const filteredByName = await data.filter((it) => {
                    const name = it.descricao
                        .normalize("NFD")
                        .replace(/\p{Mn}/gu, "")
                        .toLowerCase();
                    return name.includes(filters.name.toLowerCase());
                });

                if (!filteredByName.length)
                    throw new Error(
                        JSON.stringify({ message: "Nenhum item encontrado!" })
                    );

                setProductsList(filteredByName);
            } catch (error) {
                console.log(error);

                const errorResponse = JSON.parse(error.message);
                setError({ hasError: true, ...errorResponse });

                setLoading(false);
            }
        })();
    }, [filters]);

    return (
        <>
            <CustomHeader />
            <h1 className={`container ${styles.title}`}>Produtos</h1>
            <div className="container">
                <FiltersBox
                    filters={filters}
                    loading={loading}
                    onHandleFiltersChange={(newFilters) =>
                        setFilters({ ...newFilters })
                    }
                />
                {error.hasError ? (
                    <p className={styles.error_message}>
                        Nenhum item encontrado!
                    </p>
                ) : (
                    <ProductsList loading={loading} list={productsList} />
                )}
            </div>
        </>
    );
}
