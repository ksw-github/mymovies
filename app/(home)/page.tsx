//폐쇄망이나 특수한 네트워크환경에서 인증서오류 인증건너뛰기
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import Movie from "../../components/movie";
import styles from "../../styles/home.module.css";
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
      <div className={styles.container}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
          />
        ))}
        {/* <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div> */}
      </div>
    );
}