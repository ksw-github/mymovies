import { API_URL } from "../app/constants";
// import styles from "../styles/movie-info.module.css";
import {PosterModal, SimilarModal} from "./modal";
import MovieVideos from "./movie-videos";

export async function getMovie(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieInfo({id}:{id:string}){
    const movie = await getMovie(id);
    const totalMinutes = movie.runtime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-12 max-w-90% mx-auto w-[90%] text-[#A3A3A3]">
            <div className="mx-auto">
                <img
                src={movie.poster_path}
                className="place-self-center rounded-2xl border border-[#1d1d1d]"
                alt={movie.title}
                />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-between font-bold">
                    <h1 className="text-white text-4xl font-bold">{movie.title}</h1>
                    <span className={movie.status === "Released" ? "text-green-500" : "text-orange-400"}>
                        {movie.status}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span className="font-bold">⭐️ {movie.vote_average.toFixed(1)}</span>&#183;
                    <span>{movie.origin_country}</span>&#183;
                    <span>{movie.release_date}</span>&#183;
                    <span>{`${hours}H ${minutes}M`}</span>
                </div>
                <div className="sm:flex sm:justify-between font-bold mt-2">
                    <div className="flex gap-2">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="bg-white bg-opacity-30 rounded pl-1 pr-1 border border-[#b8b8b8]">
                                #{genre.name}
                            </span>
                        ))}
                    </div>
                    <SimilarModal id={id}/>
                </div>
                <br />
                <hr className="border-[#1d1d1d]"/>
                <MovieVideos id={id}/>
                <hr className="border-[#1d1d1d]"/>
                <br />
                <div className="items-center justify-between gap-5 text-center grid grid-cols-1 xl:grid-cols-3">
                    <div className="justify-center gap-3 group">
                        <PosterModal movie={movie}/>
                    </div>
                    <div className="col-span-2">
                        <b className="text-xl italic">{movie.tagline ? `"${movie.tagline}"` : null}</b>
                        <p className="mt-5 mb-5">{movie.overview}</p>
                        {movie.homepage ? 
                            <a className="font-bold" href={movie.homepage} target={"_blank"}>
                                Homepage &rarr;
                            </a>
                        : null}
                        <div className="flex justify-center gap-3 mt-5">
                            {movie.production_companies.map(partner => partner.logo_path && 
                            (partner.logo_path.endsWith('.jpg') || 
                            partner.logo_path.endsWith('.jpeg') || 
                            partner.logo_path.endsWith('.png') || 
                            partner.logo_path.endsWith('.gif')) ? (
                                <img
                                key={partner.id}
                                src={partner.logo_path}
                                alt={partner.name}
                                className="bg-white bg-opacity-75 rounded-sm w-11 h-fit p-0 border"
                                />
                            ):null)}
                        </div>
                    </div>
                </div>
                <br/>
                <hr className="border-[#1d1d1d]"/>
            </div>
        </div>
    );
}