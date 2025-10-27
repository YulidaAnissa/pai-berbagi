import React, { useState } from 'react';
import { IMAGES } from '../../../configs';


function Image({ src, alt, ...props }) {
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
  };

  return (
    <img
      alt={alt}
      onError={handleError}
      src={isError ? IMAGES.LOGO : src}
      {...props}
    />
  );
}

export default Image;