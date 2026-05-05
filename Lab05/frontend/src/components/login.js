import React, { useState } from 'react';
import { BiCameraMovie } from 'react-icons/bi';

function Login(props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login({ name: name || "Guest", id: id || "0" });
    props.history.push("/movies");
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>
            <BiCameraMovie />
          </div>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to review your favorite movies</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label-custom">Username</label>
            <input
              type="text"
              className="form-input-custom"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label-custom">User ID</label>
            <input
              type="text"
              className="form-input-custom"
              placeholder="Enter your ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary-custom">
            Sign In
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem', 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)' 
        }}>
          Demo login — enter any name to continue
        </p>
      </div>
    </div>
  );
}

export default Login;
