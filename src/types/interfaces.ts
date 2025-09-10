export interface IMovie{
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export interface IPopularMovie{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    index: number;
}