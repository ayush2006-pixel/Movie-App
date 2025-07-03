// SearchMovieInfo.jsx (Updated)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

const SearchMovieInfo = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const fetchMovieDetails = async () => {
        const res = await fetch(`${API_BASE_URL}/movie/${id}?append_to_response=videos`, API_OPTIONS);
        const data = await res.json();
        setMovie(data);
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <main className="wrapper space-y-6 text-white">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg w-full md:w-[300px]"
                />

                <div className="flex-1 space-y-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-sm text-gray-300">{movie.release_date} • {movie.runtime} mins • {movie.original_language?.toUpperCase()}</p>
                    <p className="text-yellow-400 text-sm">⭐ {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)</p>

                    <div className="flex gap-2 flex-wrap">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="px-2 py-1 bg-white/15 text-sm rounded-lg hover:bg-white hover:text-black transition-all ">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <p className="mt-3 text-gray-300">{movie.overview}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-6">
                        <div>
                            <strong className="text-gradient">Status:</strong> {movie.status}
                        </div>
                        <div>
                            <strong className="text-gradient">Budget:</strong> ${movie.budget?.toLocaleString()}
                        </div>
                        <div>
                            <strong className="text-gradient">Revenue:</strong> ${movie.revenue?.toLocaleString()}
                        </div>
                        <div>
                            <strong className="text-gradient">Release:</strong> {movie.release_date}
                        </div>
                    </div>

                    {movie.homepage && (
                        <a
                            href={"/"}
                            className="inline-block mt-4 px-4 py-2 rounded-lg bg-white/15 text-white hover:bg-white hover:text-black transition ">
                            Visit Homepage →
                        </a>

                    )}
                </div>
            </div>

            {(() => {
                if (!movie.videos?.results?.length) return null;

                const trailers = movie.videos.results.filter(
                    (vid) => vid.site === "YouTube" && vid.type === "Trailer"
                );

                if (trailers.length === 0) return null;

                const officialTrailer = trailers.find((vid) => vid.official === true);
                const trailerKey = officialTrailer ? officialTrailer.key : trailers[0].key;

                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Trailer</h2>
                        <iframe
                            width="100%"
                            height="300"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Trailer"
                            allowFullScreen
                            className="rounded-xl"
                        />
                    </div>
                );
            })()}

        </main>
    );
};

export default SearchMovieInfo;