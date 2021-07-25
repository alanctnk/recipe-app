/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';

export default function Copiado(props) {
  const { setIsCopy } = props;
  const twoSeconds = 2000;
  React.useEffect(() => {
    setTimeout(() => setIsCopy(false), twoSeconds);
  }, []);
  return (
    <p data-testid="share-btn" className="copiado">
      Link Copiado!
    </p>
  );
}

Copiado.propTypes = PropTypes.shape({}).isRequired;
