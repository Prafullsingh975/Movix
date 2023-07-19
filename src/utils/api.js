import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
// const TMDB_Token =  import.meta.env.TMDB_TOKEN;
const TMDB_Token =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmEwYTZlZGJmZWQwZjRiMzNjMGVkNmY4MDAzMDg1OCIsInN1YiI6IjY0OWIzZTQ3ZTAwNGE2MDExZjViNTk5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uasa5XG_tWDINSH1gUFO894j0-Ly_j2Uz5ACjoO8mrc";

const headers = {
    Authorization : "bearer " + TMDB_Token,
}

export const featchDataFromApi = async (url,params)=>{
    try {
        const {data} = await axios.get(baseURL + url,{
            headers,params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}