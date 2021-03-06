import React from 'react';

export const useResize = (ref) => {
  const getDimensions = () => ({
    width: ref.current.offsetWidth,
    height: ref.current.offsetHeight,
  });

  const [sizes, refreshSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const handleResize = () => {
      refreshSize(getDimensions());
    };

    if (ref.current) {
      refreshSize(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return sizes;
};
