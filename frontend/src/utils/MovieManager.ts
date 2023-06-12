import * as api from "./api/movie";
import IMovie from "../interfaces/Movie";

export default class MovieManager{
    public static async getMovie(mov_no:number|string){
        return await api.getMovieAPI(mov_no);
    }
    public static async getMovieList(){
        return (await api.getMovieListAPI()).sort((a,b)=>(a.mov_no as number)-(b.mov_no as number));
    }
    public static async addMovie(){
        await api.addMovieAPI();
    }
    public static async deleteMovie(mov_no:number|string){
        await api.deleteMovieAPI(mov_no);
    }
    public static async editMovie(movieData:IMovie){
        await api.editMovieAPI(movieData);
    }
}