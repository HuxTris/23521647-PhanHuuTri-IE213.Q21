import React from 'react';
import { FaLock } from 'react-icons/fa';
import { HiUser } from 'react-icons/hi';

function AddReview(props) {
  const { user } = props;

  return (
    <div className="review-section animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">
          Write a <span className="accent">Review</span>
        </h1>
        <p className="page-subtitle">
          Share your thoughts about this movie with the community.
        </p>
      </div>

      {user ? (
        <div className="login-card" style={{ maxWidth: '100%' }}>
          <div className="form-group">
            <label className="form-label-custom">Reviewing as</label>
            <div className="status-badge online" style={{ marginBottom: '1rem' }}>
              <HiUser /> {user.name}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label-custom">Your Review</label>
            <textarea 
              className="review-textarea"
              placeholder="What did you think about this movie?"
            />
          </div>
          <button className="btn-primary-custom">
            Submit Review
          </button>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon"><FaLock /></div>
          <h3>Login Required</h3>
          <p>Please login to write a review for this movie.</p>
        </div>
      )}
    </div>
  );
}

export default AddReview;
