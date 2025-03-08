import API from "./api";

export const login = async (username, password) => {
    try {
        const res = await API.post("/login", { username, password });
        localStorage.setItem("accessToken", res.data.accessToken);
        return res;
    } catch (error) {
        return error.response;
    }
};

export const register = async (username, password) => {
    try {
        console.log(username, password);
        const res = await API.post("/register", { username, password });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const logout = async () => {
    await API.post("/logout");
    localStorage.removeItem("accessToken");
};

export const checkAuth = async () => {
    try {
        const res = await API.get("/verify");
        return res.data.loggedIn; 
    } catch {
        return false;
    }
};