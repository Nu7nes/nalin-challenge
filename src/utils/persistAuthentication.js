import Cookies from "js-cookie";

const tokenKey = "accessToken";

function check() {
    const isAuthenticated = Cookies.get(tokenKey);
    return isAuthenticated;
}

function set(token, expires_in) {
    const expiresIn = new Date(expires_in);
    Cookies.set(tokenKey, token, { expires: expiresIn });
    const isAuthenticated = Cookies.get(tokenKey);
    return !!isAuthenticated;
}

function clear() {
    Cookies.remove(tokenKey);
}

export default { check, set, clear };
