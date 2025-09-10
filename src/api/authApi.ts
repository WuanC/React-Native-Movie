import apiInstance from "./apiClient"

export const createRequestToken = () => {
    return apiInstance.get("/authentication/token/new");
}
export const validateTokenWithLogin =(username: string, password: string, requestToken: string) => {
    return apiInstance.post("/authentication/token/validate_with_login", {
        username,
        password,
        request_token: requestToken
    });
}
export const createSessionId = (requestToken: string) => {
    return apiInstance.post("/authentication/session/new", {
        request_token: requestToken
    });
} 
export const getAcount = (sessionId: string) => {
    return apiInstance.get("/account", {
        params: { session_id: sessionId }
    });
}