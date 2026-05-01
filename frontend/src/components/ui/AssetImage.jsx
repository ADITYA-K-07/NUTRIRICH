import { useEffect, useState } from "react";

export default function AssetImage({
  src,
  fallbackSrc,
  alt,
  className = "",
  fallback = null,
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasFailed(false);
  }, [src]);

  function handleError() {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    setHasFailed(true);
  }

  if (hasFailed && fallback) {
    return fallback;
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
