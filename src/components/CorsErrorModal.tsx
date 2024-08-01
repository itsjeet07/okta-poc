import React from 'react';

interface Props {
  corsErrorModalOpen: boolean;
  setCorsErrorModalOpen: (open: boolean) => void;
}

const CorsErrorModal: React.FC<Props> = ({ corsErrorModalOpen, setCorsErrorModalOpen }) => {
  if (!corsErrorModalOpen) return null;

  return (
    <div>
      <h2>CORS Error</h2>
      <p>There was a CORS error. Please try again.</p>
      <button onClick={() => setCorsErrorModalOpen(false)}>Close</button>
    </div>
  );
};

export default CorsErrorModal;
