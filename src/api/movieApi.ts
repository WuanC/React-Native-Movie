import apiInstance from "./apiClient";


export const getPopularMovies = () => apiInstance.get("/movie/popular");
export const getMovieDetails = (movieId: number) => apiInstance.get(`/movie/${movieId}`);
export const getSearchMovies = (query: string, page: number = 1) => apiInstance.get("/search/movie", {
  params: { query, page },
});