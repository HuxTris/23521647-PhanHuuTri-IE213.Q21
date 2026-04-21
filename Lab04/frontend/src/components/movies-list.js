import React from 'react';
import { FaStar, FaFilm } from 'react-icons/fa';
import { MdMovieFilter } from 'react-icons/md';

const sampleMovies = [
  { id: 1, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama" },
  { id: 2, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action" },
  { id: 3, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi" },
  { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime" },
  { id: 5, title: "Interstellar", year: 2014, rating: 8.7, genre: "Sci-Fi" },
  { id: 6, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi" },
  { id: 7, title: "Parasite", year: 2019, rating: 8.5, genre: "Thriller" },
  { id: 8, title: "Spirited Away", year: 2001, rating: 8.6, genre: "Animation" },
];

function MoviesList() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">
          Trending <span className="accent">Movies</span>
        </h1>
        <p className="page-subtitle">
          Discover the latest movies and share your reviews with the community.
        </p>
      </div>

      <div className="movies-grid">
        {sampleMovies.map((movie, index) => (
          <div 
            key={movie.id} 
            className={`movie-card animate-fade-in-up delay-${(index % 4) + 1}`}
          >
            <div className="movie-card-poster">
              {index % 2 === 0 ? (
                <FaFilm />
              ) : (
                <MdMovieFilter />
              )}
            </div>
            <div className="movie-card-info">
              <div className="movie-card-title">{movie.title}</div>
              <div className="movie-card-meta">
                <span className="movie-card-rating"><FaStar /> {movie.rating}</span>
                <span>{movie.year}</span>
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
