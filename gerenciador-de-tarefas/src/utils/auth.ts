export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("auth_token");
    return !!token;
};