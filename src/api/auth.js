import { baseURL } from ".";

export function userLogin(nickname, password) {
    return fetch(
        `${baseURL}/login?ds_login=${nickname}&ds_senha=${password}`,
        { method: "GET" }
    );
}
