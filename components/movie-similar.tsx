import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-similar.module.css";

async function getSimilar(id:string){
  const response = await fetch(`${API_URL}/${id}/similar`);
  return response.json();
}

export default async function MovieSimilar({id}:{id:string}) {
  const similar = await getSimilar(id);
  return (
    <div className={styles.container}>
      {similar.map((similar) => (
        <div key={similar.id}>
          <div className={styles.img}>
            <img
              src={similar.poster_path}
              className={styles.poster}
              alt={similar.title}
            />
            <div className={styles.txtcard}>
              <h1 className={styles.title}>{similar.title}</h1>
              <h3>⭐️ {similar.vote_average.toFixed()}</h3>
              <p>{similar.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}