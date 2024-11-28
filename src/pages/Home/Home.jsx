import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import FiltersBox from "./FiltersBox/FiltersBox";
import { getProducts } from "../../api/products";
import CustomHeader from "../../components/Header/Header";
import ProductsList from "./ProductsList/ProductsList";

export default function Home() {
    const [filters, setFilters] = useState({ code: "", department: "" });
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ hasError: false });

    const queryCount = useRef(0);

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

                setProductsList(data);
                queryCount.current++;

                setLoading(false);
                setError({ hasError: false });
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
                    onHandleFiltersChange={(newFilters) =>
                        setFilters({ ...newFilters })
                    }
                />
                {error.hasError ? (
                    <p className={styles.errorMessage}>Nenhum item encontrado!</p>
                ) : (
                    <ProductsList
                        list={productsList}
                        queryCount={queryCount.current}
                    />
                )}
            </div>
        </>
    );
}
