import React from 'react';

const Photo = ({
  photo: {
    urls: { thumb },
    id,
  },
}) => {
  return <img className="single-photo" src={thumb} alt={id} />;
};

export default Photo;
