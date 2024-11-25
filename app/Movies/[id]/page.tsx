"use client";

import { Movie } from "@/app/types";
import { getMovieDetails } from "@/services/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      if (movieId) {
        const movieData = await getMovieDetails(parseInt(movieId));
        setMovie(movieData);
        setLoading(false);
      }
    }
    fetchDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="movie-details p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="my-4"
      />
      <p className="mt-2 text-lg">{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>IMDB Rating:</strong> {movie.vote_average} / 10
      </p>
    </div>
  );
};

export default MovieDetails;
