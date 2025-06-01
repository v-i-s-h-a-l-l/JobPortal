import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinners = () => {
  return (
    <ClipLoader
      color="my-4 text-xl text-red-500"
      loading={true}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinners;
