import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

const MoviesList = props => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [ratings, setRatings] = useState(['All Ratings']);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        console.log(response.data);
        setRatings(['All Ratings'].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    find(searchTitle, 'title');
  };

  const findByRating = () => {
    if (searchRating === 'All Ratings') {
      retrieveMovies();
    } else {
      find(searchRating, 'rated');
    }
  };

  return (
    <div className="animate-fade-in">
      <Container>
        <div className="page-header">
          <h1 className="page-title">
            Discover <span className="accent">Movies</span>
          </h1>
          <p className="page-subtitle">
            Browse, search and review your favorite movies.
          </p>
        </div>

        <div className="search-section">
          <Row className="align-items-end">
            <Col md={6} className="mb-3 mb-md-0">
              <label className="form-label-custom">Search by Title</label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Enter movie title..."
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                  className="form-input-custom"
                />
                <Button className="btn-search" onClick={findByTitle}>
                  <FaSearch /> Search
                </Button>
              </div>
            </Col>
            <Col md={6}>
              <label className="form-label-custom">Filter by Rating</label>
              <div className="d-flex gap-2">
                <Form.Control
                  as="select"
                  value={searchRating}
                  onChange={onChangeSearchRating}
                  className="form-input-custom"
                >
                  {ratings.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </Form.Control>
                <Button className="btn-search" onClick={findByRating}>
                  <FaSearch /> Search
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <Col lg={4} md={6} className="mb-4" key={movie._id || index}>
                <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}>
                  <Card className={`movie-card h-100 animate-fade-in-up delay-${(index % 4) + 1}`}>
                    <div className="movie-card-poster" style={{ position: 'relative' }}>
                      {movie.poster && (
                        <Card.Img
                          variant="top"
                          src={movie.poster}
                          style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.querySelector('.poster-fallback').style.display = 'flex';
                          }}
                          onLoad={(e) => {
                            e.target.parentElement.querySelector('.poster-fallback').style.display = 'none';
                          }}
                        />
                      )}
                      <span className="poster-fallback" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', zIndex: 0 }}>No Poster</span>
                    </div>
                    <Card.Body className="movie-card-info d-flex flex-column">
                      <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                      <div className="movie-card-meta mb-1">
                        <span className="movie-card-rating">{movie.rated || 'N/A'}</span>
                      </div>
                      <Card.Text className="movie-card-plot">{movie.plot}</Card.Text>
                      <div className="movie-card-link">
                        View Reviews <FaArrowRight size={11} />
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Col>
              <div className="no-reviews animate-fade-in" style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <FaSearch /> No movies found
                </p>
                <p style={{ fontSize: '0.85rem' }}>Try a different search term or filter.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesList;
