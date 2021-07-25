import React from 'react';
import bordaloading from '../images/bordaloading1.png';
import logo from '../images/logo_size_invert.jpg';

export default function Loading() {
  return (
    <div className="body-loading">
      <div className="tela-loading">
        <div className="div-loading">
          <img className="borda" src={ bordaloading } alt="borda loading" />
        </div>
        <img className="logo-loading" src={ logo } alt="logo" />
      </div>
    </div>
  );
}
