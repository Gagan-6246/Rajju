import React, { useState, useEffect } from 'react';

const Section = ({ title, content, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="section-container">
      {/* Background Carousel */}
      <div 
        className="bg-carousel"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {images.map((img, index) => {
          // Only load the image into memory if it's currently visible or about to be visible
          const diff = Math.abs(index - currentIndex);
          const isNear = diff <= 2 || diff >= images.length - 2;

          return (
            <div 
              key={index} 
              className="bg-slide" 
              style={{ backgroundImage: isNear ? `url(${img})` : 'none' }}
            />
          );
        })}
      </div>

      {/* Glassmorphism Card */}
      <div className="glass-card">
        <h2>{title}</h2>
        {content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default Section;
