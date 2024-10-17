"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { API_URL } from "../app/constants";
import Slider from "react-slick";

export function PosterModal({ movie }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="items-center justify-between gap-5 text-center">
            <div className="relative flex items-center group col-span-1">
                {movie.backdrop_path && 
                    (movie.backdrop_path.endsWith('.jpg') || 
                    movie.backdrop_path.endsWith('.jpeg') || 
                    movie.backdrop_path.endsWith('.png') || 
                    movie.backdrop_path.endsWith('.gif')) ? (
                        <div className="flex items-center justify-center border rounded-xl border-[#1d1d1d] transition hover:opacity-75 cursor-pointer" onClick={toggleModal}>
                            <img
                            src={movie.backdrop_path}
                            alt={movie.title}
                            className="rounded-xl col-span-1"
                            />
                            <div className="absolute w-full h-full flex justify-end p-2 bg-black rounded-lg bg-opacity-0 hover:bg-opacity-35 transition-all">
                                <i className="fa-solid fa-expand w-4 h-4 group-hover:scale-125 transition-all"></i>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full rounded-xl border border-[#1d1d1d] p-10">
                            <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
                            <p>Not found image</p>
                        </div>
                    )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="relative z-60">
                        <img
                        src={movie.backdrop_path}
                        alt={movie.title}
                        className="max-w-full max-h-full rounded-lg border border-[#1d1d1d]"
                        />
                        <button className="absolute top-2 right-2 bg-black bg-opacity-0 hover:scale-125 transition-all" onClick={toggleModal}>
                            <i className="fa-solid fa-xmark text-3xl"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

async function getSimilar(id){
  const response = await fetch(`${API_URL}/${id}/similar`);

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
      return await response.json();
  } catch (error) {
      console.error("JSON 파싱 오류:", error);
      return [];
  }
}

export function SimilarModal({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [similar, setSimilar] = useState([]);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    useEffect(() => {
        const fetchSimilarMovies = async () => {
            const movies = await getSimilar(id);
            setSimilar(movies);
        };
        
        if (isModalOpen) {
            fetchSimilarMovies();
        }
    }, [id, isModalOpen]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
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
        <div>
            <button className="font-bold hover:underline" onClick={toggleModal}>
                similar&nbsp;<i className="fa-solid fa-angles-right"></i>
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50" onClick={toggleModal}>
                    <div className="mx-auto text-center w-[90%]" onClick={(e) => e.stopPropagation()}>
                        {similar.length > 0 ? (
                            <Slider {...settings}>
                                    {similar.map((movie) => (
                                        movie.poster_path ? (
                                            <div key={movie.id}>
                                                <Link prefetch href={`/movies/${movie.id}`}>
                                                    <img
                                                        src={movie.poster_path}
                                                        className="w-[300px] mx-auto rounded-[15px]"
                                                        alt={movie.title}
                                                    />
                                                </Link>
                                            </div>
                                        ) : null
                                    ))}
                            </Slider>
                        ) : (
                            <div className="text-white">정보가 없습니다</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}