//폐쇄망이나 특수한 네트워크환경에서 인증서오류 인증건너뛰기
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import Movie from "../../components/movie-home";
import { API_URL } from "../constants";

export const metadata ={
    title: "Home"
}

async function getMovies(){
    // await new Promise((resolve)=>setTimeout(resolve, 1000));
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
}

export default async function Home() {
    const movies = await getMovies();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-90% mx-auto w-[90%]">
            {movies.map((movie) => (
                <Movie
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                />
            ))}
        </div>
    );
}