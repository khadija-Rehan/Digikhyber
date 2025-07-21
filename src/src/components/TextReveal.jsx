import React from 'react';
import { useInView } from 'react-intersection-observer';

const TextReveal = ({ text }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });
  const words = text.split(' ');

  return (
    <p ref={ref} className="text-reveal mb-0">
      {words.map((word, index) => (
        <span
          key={index}
          className={`word ${inView ? 'visible' : ''}`}
          style={{
            transitionDelay: `${index * 200}ms`,
            transitionDuration: '1000ms',
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
};

export default TextReveal;
