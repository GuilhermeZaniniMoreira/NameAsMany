import React from 'react';

function Marker(props: { name: string, state_abbreviation: string, population_min_max_normalization: number }) {
  const { name, state_abbreviation, population_min_max_normalization } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{
          backgroundColor: 'red',
          cursor: 'pointer',
          width: '30px',
          height: '30px',
        }}
        title={`${name} - ${state_abbreviation}`}
      />
      <div className="pulse" />
    </div>
  );
};

export default Marker;
