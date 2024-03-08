import React from "react";

const FireAnimation: React.FC = () => {
  const parts = 300 * 2; //50 220
  const fireColor = 'rgb(255,80,0)';
  const fireColorT = 'rgba(255,80,0,0)';
  const dur = '1s';
  const blur = '0.02em';
  const fireRad = '3em';
  const partSize = '0.5em'; //3.5 1.7

  const getRandomValue = () => Math.random();

  return (
    <div style={{
      backgroundColor: 'transparent',
      width: '100%',
      alignSelf: 'center',
    }}>
      <div className="fire" style={{
        fontSize: '24px',
        filter: `blur(${blur})`,
        WebkitFilter: `blur(${blur})`, // Webkit prefix for Webkit-based browsers like Safari
        position: 'relative',
        width: '100%',
        height: '2.9em',
        alignSelf: 'center'
      }}>
        {[...Array(parts)].map((_, index) => (
          <div key={index} className="particle" style={{
            animation: `rise ${dur} ease-in infinite`,
            backgroundImage: `radial-gradient(${fireColor} 20%, ${fireColorT} 70%)`,
            borderRadius: '50%',
            mixBlendMode: 'screen',
            opacity: 0,
            position: 'absolute',
            bottom: 0,
            width: partSize,
            height: partSize,
            animationDelay: `${getRandomValue()}s`,
            left: `calc((100% - ${partSize}) * ${getRandomValue()})`
          }} />
        ))}
      </div>
      <style>{`
        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          25% {
            opacity: 1;
          }
          to {
            opacity: 0;
            transform: translateY(-3.3em) scale(9); 
          }
        }
      `}</style>
    </div>
  );
}; // -2em 3.3em

export default FireAnimation;
