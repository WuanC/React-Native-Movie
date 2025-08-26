import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  headers:
    { "Content-Type": "application/json" },
});

apiInstance.interceptors.request.use((config) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzI5MmJkZjk4ODUxNzczNjNkNmNiM2EyMjNhYmVmMSIsIm5iZiI6MTc1NjEwNTk2Ni4wNTQwMDAxLCJzdWIiOiI2OGFjMGNlZWFlZjY2NTI2OGExZTUwNGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8-2-kG0N6NY4AwcHyNnBEJmzMySPF62_nhEyGL56OLE"
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}
);

export default apiInstance;