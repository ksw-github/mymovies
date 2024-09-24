import { API_URL } from "../app/constants";
import styles from "../styles/movie-info.module.css";

export async function getMovie(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

async function getVideos(id:string){
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

export default async function MovieInfo({id}:{id:string}){
    const movie = await getMovie(id);
    const videos = await getVideos(id);
    const firstVideo = videos[0];
    const totalMinutes = movie.runtime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return (
        <div className={styles.container}>
            <img
                src={movie.poster_path}
                className={styles.poster}
                alt={movie.title}
            />
            <div className={styles.info}>
                <div className="flex items-center justify-between font-bold">
                    <h1 className={`${styles.title}`}>{movie.title}</h1>
                    <span className={movie.status === "Released" ? "text-green-500" : "text-orange-400"}>
                        {movie.status}
                    </span>
                </div>
                <div className="flex gap-1">
                    <span>⭐️ {movie.vote_average.toFixed(1)}</span>&#183;
                    <span>{movie.origin_country}</span>&#183;
                    <span>{movie.release_date}</span>&#183;
                    <span>{`${hours}H ${minutes}M`}</span>
                </div>
                <div className="flex gap-2 font-bold text-white">
                    {movie.genres.map(genre => (
                        <span key={genre.id} className="border bg-white bg-opacity-30 rounded pl-1 pr-1">
                            {genre.name}
                        </span>
                    ))}
                </div>
                <a className="font-bold" href={movie.homepage} target={"_blank"}>
                    Homepage &rarr;
                </a>
                <hr className="border-gray-100"></hr>
                <iframe
                key={firstVideo.id}
                src={`https://youtube.com/embed/${firstVideo.key}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={firstVideo.name}
                />
                <div className="text-center items-center">
                    <img
                        src={movie.backdrop_path}
                        className="w-15"
                        alt={movie.title}
                    />
                    <b className="text-xl">"{movie.tagline}"</b>
                    <p className="mt-5 mb-5">{movie.overview}</p>
                    <a className="font-bold" href={movie.homepage} target={"_blank"}>
                    similar&rarr;
                    </a>
                    <div className="flex justify-center gap-3 mt-5">
                        {movie.production_companies.map(partner => (
                            <div key={partner.id} className="bg-white bg-opacity-40 rounded-sm h-auto">
                                <img
                                    src={partner.logo_path}
                                    alt={partner.name}
                                    className="w-10"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}