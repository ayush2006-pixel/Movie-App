import React from 'react';
import { Link } from 'react-router-dom';

const Moviecard = ({ movie }) => {
  const { title, poster_path, release_date, original_language, vote_average, id } = movie;
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <Link to={`/movie/${id}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative rounded-xl p-0.5 overflow-hidden shadow-md cursor-pointer transition-all duration-300"
      >
        {visible && (
          <div
            className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 opacity-80 transition-opacity duration-300"
            style={{
              top: position.y - 120,
              left: position.x - 120,
            }}
          />
        )}

        <div className="relative z-10">
          <div className="movie-card">
            <img
              src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
              alt={title}
            />
            <div>
              <h3 className="mt-4">{title}</h3>
              <div className="content">
                <div className="rating">
                  <img src="star.svg" alt="Star Icon" />
                  <p>{vote_average ? vote_average.toFixed(1) : 'N/A'} / 10</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language || 'N/A'}</p>
                <span>•</span>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Moviecard;
