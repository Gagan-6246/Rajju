import React, { useState, useEffect, useRef } from 'react';

const BouncingWatermark = ({ text = "SORRY " }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const velocity = useRef({ dx: 2.5, dy: 2.5 });
  const textRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const moveText = () => {
      setPosition((prevPos) => {
        let newX = prevPos.x + velocity.current.dx;
        let newY = prevPos.y + velocity.current.dy;

        const textWidth = textRef.current ? textRef.current.offsetWidth : 200;
        const textHeight = textRef.current ? textRef.current.offsetHeight : 100;

        const maxX = window.innerWidth - textWidth;
        const maxY = window.innerHeight - textHeight;

        // Bounce horizontally
        if (newX <= 0) {
          newX = 0;
          velocity.current.dx = Math.abs(velocity.current.dx);
        } else if (newX >= maxX) {
          newX = maxX;
          velocity.current.dx = -Math.abs(velocity.current.dx);
        }

        // Bounce vertically
        if (newY <= 0) {
          newY = 0;
          velocity.current.dy = Math.abs(velocity.current.dy);
        } else if (newY >= maxY) {
          newY = maxY;
          velocity.current.dy = -Math.abs(velocity.current.dy);
        }

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(moveText);
    };

    animationFrameId = requestAnimationFrame(moveText);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={textRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 5, // Behind the glass card (z-index 10) but above background
        pointerEvents: 'none',
        fontSize: '6rem', // Large watermark size
        fontWeight: '900',
        fontFamily: 'var(--font-heading)',
        color: 'rgba(255, 255, 255, 0.12)', // Subtle watermark transparency
        userSelect: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        willChange: 'transform', // Optimize animation
        textAlign: 'center',
        lineHeight: '1.1'
      }}
    >
      <div>Sorry</div>
      <div>Putti</div>
    </div>
  );
};

export default BouncingWatermark;
