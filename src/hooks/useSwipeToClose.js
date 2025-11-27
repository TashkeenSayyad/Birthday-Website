import { useState, useRef } from 'react';

/**
 * Custom hook for swipe-down-to-close gesture
 * @param {Function} onClose - Callback when swipe threshold is met
 * @param {number} threshold - Distance in pixels to trigger close (default: 150)
 * @returns {Object} Touch handlers, transform value, and ref
 */
export const useSwipeToClose = (onClose, threshold = 150) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [transform, setTransform] = useState(0);
  const elementRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY);
    const distance = e.touches[0].clientY - touchStart;

    // Only allow downward swipe
    if (distance > 0) {
      setTransform(distance);
      // Add resistance effect
      const opacity = Math.max(0.3, 1 - distance / 400);
      if (elementRef.current) {
        elementRef.current.style.opacity = opacity;
      }
    }
  };

  const handleTouchEnd = () => {
    const distance = touchEnd - touchStart;

    // Close if swiped down more than threshold
    if (distance > threshold) {
      onClose();
    } else {
      // Spring back to original position
      setTransform(0);
      if (elementRef.current) {
        elementRef.current.style.opacity = 1;
      }
    }
  };

  return {
    elementRef,
    transform,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
};
