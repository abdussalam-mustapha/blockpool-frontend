import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullPage?: boolean;
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = '#4CAF50',
  fullPage = false,
  text
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    borderColor: `${color} transparent transparent transparent`
  };

  const spinner = (
    <div className="spinner">
      <div className="spinner-ring" style={spinnerStyle}></div>
      <div className="spinner-ring" style={spinnerStyle}></div>
      <div className="spinner-ring" style={spinnerStyle}></div>
      <div className="spinner-ring" style={spinnerStyle}></div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="spinner-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;
