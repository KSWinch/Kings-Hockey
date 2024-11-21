import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import './index.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Debounced function to handle scroll events
    const toggleVisibility = debounce(() => {
      const shouldBeVisible = window.scrollY > 150;

      // Update state only if it has changed
      if (isVisibleRef.current !== shouldBeVisible) {
        isVisibleRef.current = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
    }, 100); // Debounce delay in milliseconds

    // Add the scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      // Remove the scroll event listener and cancel debounce
      window.removeEventListener('scroll', toggleVisibility);
      toggleVisibility.cancel(); // Cancel pending debounced calls
    };
  }, []); // Empty dependency array to set up once

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
