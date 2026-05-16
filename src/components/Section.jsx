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
        {images.map((img, index) => (
          <div 
            key={index} 
            className="bg-slide" 
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
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
