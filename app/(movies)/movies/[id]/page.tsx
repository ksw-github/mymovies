import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";
import MovieSimilar from "../../../../components/movie-similar";

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
            <Suspense fallback ={<h1>videos 로딩중</h1>}>
                <MovieVideos id={id}/>
            </Suspense>
            <Suspense fallback ={<h1>similar 로딩중</h1>}>
                <MovieSimilar id={id}/>
            </Suspense>
        </div>
    )
};