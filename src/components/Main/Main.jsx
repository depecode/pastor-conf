import React, { useState, useRef } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const Main = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const dpImageRef = useRef(null);

  const handleNameChange = (e) => setName(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dpImageRef.current) {
      try {
        const dataUrl = await toPng(dpImageRef.current, {
          quality: 1.0,
          pixelRatio: 2,
        });
        download(dataUrl, 'conference-dp.png');
      } catch (err) {
        console.error('Error generating image:', err);
        alert('There was an issue generating the image. Please try again.');
      }
    }
  };

  const isFormValid = name && image;

  return (
    <div className="main-content">
      {/* Banner */}
      <div className="banner">
        <img
          src={assets.pastor_conf_banner}
          alt="Conference Banner"
          className="banner-img"
        />
      </div>

      {/* DP Generator Card */}
      <div className="dp-generator-card">
        <p className="card-title">Generate your Conference Display Picture</p>

        <form onSubmit={handleSubmit} className="dp-form">
          <div ref={dpImageRef} className="dp-image-container">
            {/* Background Template */}
            <img
              src={assets.pastor_conf_dp}
              alt="DP Background"
              className="dp-background"
            />

            {/* User Uploaded Image */}
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="uploaded-image"
              />
            )}

            {/* User Name */}
            {name && <p className="user-name">{name}</p>}
          </div>

          {/* Input Section */}
          <div className="input-section">
            <p className="input-title">Create your entry below</p>

            {/* Name Input */}
            <div className="input-group">
              <label htmlFor="user-name" className="input-label">
                Your Name:
              </label>
              <input
                type="text"
                id="user-name"
                value={name}
                onChange={handleNameChange}
                className="input-field"
                placeholder="Enter your name"
              />
            </div>

            {/* Image Upload */}
            <div className="input-group">
              <label className="input-label">Upload Image:</label>
              <label htmlFor="user-image" className="upload-button">
                <span>+</span> Choose Image
              </label>
              <input
                type="file"
                id="user-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
              />
            </div>

            {/* Download Button */}
            <button
              type="submit"
              className="download-button"
              disabled={!isFormValid}
            >
              Download
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Main;
