import React from 'react';
import { FaStar, FaRegStar, FaFilm, FaCalendarAlt, FaClock, FaTheaterMasks } from 'react-icons/fa';
import { HiUser } from 'react-icons/hi';

function Movie(props) {
  const { user } = props;

  return (
    <div className="animate-fade-in">
      <div className="movie-detail-header">
        <div className="movie-detail-poster">
          <FaFilm />
        </div>
        <div className="movie-detail-info">
          <h1>Movie Title</h1>
          <div className="movie-detail-meta">
            <span className="meta-badge"><FaStar style={{ color: 'var(--gold)' }} /> 8.5/10</span>
            <span className="meta-badge"><FaCalendarAlt /> 2024</span>
            <span className="meta-badge"><FaTheaterMasks /> Drama</span>
            <span className="meta-badge"><FaClock /> 2h 30m</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '1rem' }}>
            Movie details and plot summary will be displayed here. This section will pull data 
            from the backend API to show complete movie information including cast, director, 
            and synopsis.
          </p>
          {user && (
            <span className="status-badge online" style={{ marginTop: '1rem' }}>
              <HiUser /> Logged in as {user.name}
            </span>
          )}
        </div>
      </div>

      <div className="reviews-list">
        <h2 className="page-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
          User <span className="accent">Reviews</span>
        </h2>
        <div className="review-item animate-fade-in-up delay-1">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Sample Reviewer</strong>
            <span className="movie-card-rating">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
            Reviews from users will appear here once the backend API is connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
