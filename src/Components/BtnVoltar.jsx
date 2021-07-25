import React from 'react';
import arrowBack from '../images/arrowBack.svg';

export default function BtnVoltar() {
  function goBack() {
    window.history.back();
  }
  return (
    <button className="btn-voltar btn-search" type="button" onClick={ goBack }>
      <img src={ arrowBack } alt="seta de voltar" />
    </button>
  );
}
