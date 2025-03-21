import http from "../http-common";
import { getTokenBearer } from "../utility/Utility";

export const getAll = () => {
    return http.get("/users", {
        headers: {
            Authorization: getTokenBearer(),
        },
    });
};

export const authenticate = (email, password) => {
    return http.post("/auth/login", { email, password });
};

export const signUp = (username, email, password) => {
    return http.post("/auth/signup", { username, email, password });
};