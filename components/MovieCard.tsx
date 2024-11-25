import { Movie } from "@/app/types";
import Image from "next/image";
import React from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
      <Image
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-t-md"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {movie.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
