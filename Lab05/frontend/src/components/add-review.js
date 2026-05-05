import React, { useState } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaLock } from 'react-icons/fa';
import { HiUser } from 'react-icons/hi';

const AddReview = props => {
  let editing = false;
  let initialReviewState = '';

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = e => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: props.match.params.id
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div className="review-section animate-fade-in">
      <Container>
        {props.user ? (
          <div>
            <div className="page-header">
              <h1 className="page-title">
                {editing ? 'Edit' : 'Write a'} <span className="accent">Review</span>
              </h1>
              <p className="page-subtitle">
                {editing ? 'Update your review for this movie.' : 'Share your thoughts about this movie with the community.'}
              </p>
            </div>

            {submitted ? (
              <div className="login-card" style={{ maxWidth: '100%' }}>
                <h4 style={{ marginBottom: '1rem' }}>Review submitted successfully!</h4>
                <Link to={`/movies/${props.match.params.id}`} className="btn btn-primary btn-primary-custom d-inline-block" style={{ width: 'auto' }}>
                  Back to Movie
                </Link>
              </div>
            ) : (
              <div className="login-card" style={{ maxWidth: '100%' }}>
                <div className="form-group">
                  <label className="form-label-custom">Reviewing as</label>
                  <div className="status-badge online" style={{ marginBottom: '1rem' }}>
                    <HiUser /> {props.user.name}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label-custom">Your Review</label>
                  <Form.Control
                    as="textarea"
                    className="review-textarea"
                    placeholder="What did you think about this movie?"
                    value={review}
                    onChange={onChangeReview}
                  />
                </div>
                <Button 
                  className="btn-primary-custom"
                  onClick={saveReview}
                >
                  {editing ? 'Update Review' : 'Submit Review'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><FaLock /></div>
            <h3>Login Required</h3>
            <p>Please login to write a review for this movie.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AddReview;
