import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaUserCircle, FaCalendarAlt, FaStar, FaClock, FaCommentAlt } from 'react-icons/fa';

const Movie = props => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: []
  });

  const getMovie = id => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState
          };
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="animate-fade-in">
      <Container>
        {/* Back button */}
        <Link to="/movies" className="btn-back">
          <FaArrowLeft size={12} /> Back to Movies
        </Link>

        {/* Hero section */}
        <div className="detail-hero">
          <div className="detail-hero-backdrop">
            {movie.poster && (
              <img
                src={movie.poster}
                alt=""
                className="detail-backdrop-img"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="detail-backdrop-overlay"></div>
          </div>

          <Row className="detail-hero-content">
            <Col md={4} lg={3} className="mb-4 mb-md-0">
              <div className="detail-poster-wrapper">
                <div className="movie-detail-poster" style={{ position: 'relative' }}>
                  {movie.poster && (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="detail-poster-img"
                      onError={(e) => { e.target.style.display = 'none'; }}
                      onLoad={(e) => {
                        const fb = e.target.parentElement.querySelector('.poster-fallback');
                        if (fb) fb.style.display = 'none';
                      }}
                    />
                  )}
                  <span className="poster-fallback" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Poster</span>
                </div>
              </div>
            </Col>
            <Col md={8} lg={9}>
              <div className="detail-info">
                <h1 className="detail-title">{movie.title}</h1>
                <div className="detail-badges">
                  {movie.rated && (
                    <span className="detail-badge detail-badge-rating">
                      <FaStar size={12} /> {movie.rated}
                    </span>
                  )}
                  {movie.year && (
                    <span className="detail-badge">
                      <FaCalendarAlt size={11} /> {movie.year}
                    </span>
                  )}
                  {movie.runtime && (
                    <span className="detail-badge">
                      <FaClock size={11} /> {movie.runtime} min
                    </span>
                  )}
                  {movie.genres && movie.genres.map((genre, i) => (
                    <span key={i} className="detail-badge">{genre}</span>
                  ))}
                </div>

                <div className="detail-plot-section">
                  <h3 className="detail-section-label">Plot</h3>
                  <p className="detail-plot">{movie.plot}</p>
                </div>

                {props.user && (
                  <Link
                    to={`/movies/${props.match.params.id}/review`}
                    className="btn-add-review"
                  >
                    <FaPlus size={12} /> Add Review
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </div>

        {/* Reviews section */}
        <div className="detail-reviews-section">
          <div className="detail-reviews-header">
            <h2 className="detail-reviews-title">
              Reviews
              {movie.reviews && movie.reviews.length > 0 && (
                <span className="detail-reviews-count">{movie.reviews.length}</span>
              )}
            </h2>
          </div>

          {movie.reviews && movie.reviews.length > 0 ? (
            <div className="detail-reviews-list">
              {movie.reviews.map((review, index) => (
                <div key={index} className={`detail-review-card animate-fade-in-up delay-${(index % 4) + 1}`}>
                  <div className="detail-review-top">
                    <div className="detail-review-user">
                      <div className="detail-review-avatar">
                        <FaUserCircle size={32} />
                      </div>
                      <div>
                        <div className="detail-review-name">{review.name}</div>
                        <div className="detail-review-date">
                          <FaCalendarAlt size={10} /> {moment(review.date).format('MMMM Do YYYY, h:mm a')}
                        </div>
                      </div>
                    </div>
                    {props.user && props.user.id === review.user_id && (
                      <div className="review-actions">
                        <Link
                          to={{
                            pathname: `/movies/${props.match.params.id}/review`,
                            state: { currentReview: review }
                          }}
                          className="btn-review-edit"
                        >
                          <FaEdit size={11} /> Edit
                        </Link>
                        <button
                          className="btn-review-delete"
                          onClick={() => deleteReview(review._id, index)}
                        >
                          <FaTrash size={11} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="detail-review-text">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <p style={{ fontSize: '1.1rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FaCommentAlt /> No reviews yet
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                {props.user ? 'Be the first to share your thoughts!' : 'Login to write the first review.'}
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Movie;
