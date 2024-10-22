import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieCredits from "../../../../components/movie-credits";
import MovieProviders from "../../../../components/movie-providers";

interface IParams{
    params: {id:string};
}

export async function generateMetadata({params:{id}}:IParams) {
    const movie = await getMovie(id);
    return {
        title: movie.title,
    };
}

export default async function Movies ({params:{id}}:IParams) {
    return (
        <div>
            <Suspense fallback ={<h1>info 로딩중</h1>}>
                <MovieInfo id={id}/>
            </Suspense>
            <br/>
            <Suspense fallback ={<h1>credits 로딩중</h1>}>
                <MovieCredits id={id}/>
            </Suspense>
            <br/>
            <Suspense fallback ={<h1>credits 로딩중</h1>}>
                <MovieProviders id={id}/>
            </Suspense>
        </div>
    )
};