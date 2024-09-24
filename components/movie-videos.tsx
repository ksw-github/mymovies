import { API_URL } from "../app/constants";
import styles from "../styles/movie-videos.module.css";

async function getVideos(id:string){
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
    const videos = await getVideos(id);
    if (videos.length === 0) return <p>비디오가 없습니다.</p>;
    const firstVideo = videos[0];
    return (
        <div className={styles.container}>
            <iframe
            key={firstVideo.id}
            src={`https://youtube.com/embed/${firstVideo.key}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={firstVideo.name}
            />
        {/* {videos.map((video) => (
            <iframe
            key={video.id}
            src={`https://youtube.com/embed/${video.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.name}
            />
        ))} */}
        </div>
    );
}