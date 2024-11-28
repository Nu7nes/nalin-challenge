import { baseURL } from ".";
import persistAuthentication from "../utils/persistAuthentication";

export function getProducts(code, department) {
    const accessToken = persistAuthentication.check();

    const queryParams = new URLSearchParams();
    if (code) queryParams.append('codigo', code);
    if (department) queryParams.append('departamento', department);

    let queries = "?" + queryParams;

    return fetch(
        `${baseURL}/produtos/listar${queries !== "?" ? queries : ""}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );
}
