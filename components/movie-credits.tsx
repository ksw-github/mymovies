"use client"
import { API_URL } from "../app/constants";
import styles from "../styles/movie-credits.module.css";
import Slider from "react-slick";

async function getCredits(id:string){
    const response = await fetch(`${API_URL}/${id}/credits`);
    return response.json();
}

export default async function MovieCredits({ id }: { id: string }) {
    const credits = await getCredits(id);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className={styles.container}>
            <Slider {...settings}>
                {credits.map((credit) => (credit.profile_path && (
                    <div key={credit.id}>
                        <div className={styles.img}>
                            <img
                            src={credit.profile_path}
                            className={styles.poster}
                            alt={credit.name}
                            />
                        </div>
                        <div>
                            <b className={styles.name}>{credit.original_name}</b>
                            <p>{credit.character}</p>
                        </div>
                    </div>
                )))}
            </Slider>
        </div>
    );
}