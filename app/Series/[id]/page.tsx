"use client";

import { getShowDetails } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Season, Series } from "../../types";
import { motion } from "framer-motion";

const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: series,
    isLoading,
    isError,
  } = useQuery<Series>({
    queryKey: ["seriesDetails", id],
    queryFn: () => getShowDetails(parseInt(id!)),
    enabled: !!id,
  });

  const [activeSeriesPoster, setActiveSeriesPoster] = useState<string | null>(
    null
  );
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

  useEffect(() => {
    if (series) {
      setActiveSeriesPoster(series.poster_path || null);
      setSelectedSeason(series.seasons?.[0] || null);
    }
  }, [series]);

  const handleSeasonChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const seasonNumber = parseInt(event.target.value);
    const season = series?.seasons.find(
      (s) => s.season_number === seasonNumber
    );
    setSelectedSeason(season || null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !series) return <div>Series not found.</div>;

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5, staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      className="relative overflow-hidden text-white p-20 min-h-screen flex flex-col justify-center items-center bg-black/70"
      style={{
        backgroundImage: activeSeriesPoster
          ? `url(https://image.tmdb.org/t/p/w500${activeSeriesPoster})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.7)",
      }}
    >
      <motion.div
        className="backdrop-blur-lg p-10 rounded-xl shadow-lg bg-black/60 max-w-3xl"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl font-bold mb-4" variants={itemVariant}>
          {series.name}
        </motion.h1>

        <motion.p className="text-lg mb-6" variants={itemVariant}>
          {series.overview}
        </motion.p>

        <motion.div className="flex space-x-4 mb-6" variants={itemVariant}>
          <p className="font-semibold">
            ⭐ {series.vote_average} | Votes: {series.vote_count}
          </p>
          <p className="font-semibold">Episodes: {series.number_of_episodes}</p>
          <p className="font-semibold">First Aired: {series.first_air_date}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          variants={itemVariant}
        >
          {series.genres.map((genre) => (
            <span key={genre.id} className="px-2 py-1 bg-gray-800 rounded">
              {genre.name}
            </span>
          ))}
        </motion.div>

        <motion.div variants={itemVariant}>
          <label htmlFor="season-select" className="block mb-2 font-semibold">
            Select Season:
          </label>
          <select
            id="season-select"
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={selectedSeason?.season_number || ""}
            onChange={handleSeasonChange}
          >
            {series.seasons.map((season) => (
              <option key={season.id} value={season.season_number}>
                Season {season.season_number}
              </option>
            ))}
          </select>
        </motion.div>

        {selectedSeason && (
          <motion.div className="mt-8" variants={containerVariant}>
            <motion.h2
              className="text-2xl font-bold mb-4"
              variants={itemVariant}
            >
              Episodes for {selectedSeason.name}
            </motion.h2>
            <ul className="space-y-4">
              {selectedSeason.episodes?.map((episode) => (
                <motion.li
                  key={episode.id}
                  className="p-4 bg-gray-700 rounded shadow"
                  variants={itemVariant}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{episode.name}</span>
                    <span>{episode.air_date}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SeriesDetails;
