import React, { useState } from 'react';
import { ImageSkeleton } from '../pages/Skeletons.js';

export default function ({ src, alt, style, size }) {
  const [showImg, setShowImg] = useState(false);
  return (
    <>
      {!showImg && <ImageSkeleton size={size} />}
      <img
        className={showImg ? style : 'display-none'}
        src={src}
        alt={alt}
        onLoad={() => setShowImg(true)}
      />
    </>
  );
}
