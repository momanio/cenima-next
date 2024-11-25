"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { Movie } from "@/app/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { getPopularMovies } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const {
    data: movies,
    error,
    isLoading,
  } = useQuery<Movie[], Error>({
    queryKey: ["getPopularMovies"],
    queryFn: getPopularMovies,
  });

  useEffect(() => {
    if (mainSwiperRef.current && thumbsSwiper) {
      mainSwiperRef.current.thumbs.swiper = thumbsSwiper;
      mainSwiperRef.current.update();
    }
  }, [thumbsSwiper]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching series: {error.message}</div>;

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="mx-auto  relative"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute left-10 -right-5 bottom-40 mx-auto w-4/6 z-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          navigation={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mainSwiper"
          onInit={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id} className="rounded-lg overflow-hidden">
              <Link href={`/Movies/${movie.id}`}>
                <motion.img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover rounded-lg opacity-80 hover:opacity-100 transition duration-300"
                  variants={imageVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                />
                <motion.h3
                  className="text-2xl font-semibold text-white truncate mt-4"
                  variants={textVariant}
                  initial="hidden"
                  animate="visible"
                >
                  {movie.title}
                </motion.h3>
                <motion.p
                  className="mt-2 text-lg text-gray-100 line-clamp-3"
                  variants={textVariant}
                  initial="hidden"
                  animate="visible"
                >
                  {movie.release_date}
                </motion.p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
        freeMode={false}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="thumbsSwiper fixed inset-0 w-full h-full z-10 bg-gray-900 bg-opacity-90"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id} className="rounded-lg overflow-hidden">
            <motion.img
              src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg opacity-70 hover:opacity-100 transition duration-300"
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            />
            <motion.h2
              className="text-3xl px-6 mt-4 font-semibold text-white truncate"
              variants={textVariant}
              initial="hidden"
              animate="visible"
            >
              {movie.title}
            </motion.h2>
            <motion.p
              className="mt-2 px-4  text-lg text-gray-100 line-clamp-4"
              variants={textVariant}
              initial="hidden"
              animate="visible"
            >
              {movie.overview}
            </motion.p>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
