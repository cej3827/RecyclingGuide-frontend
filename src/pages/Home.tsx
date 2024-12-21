import React from 'react';
import ImageUpload from '../components/ImageUpload.tsx';
import '../styles/ImageUpload.css'

const Home = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <header className="header" onClick={handleRefresh}>
        <h1>Recycling Guide System</h1>
      </header>
      <div className="uploadSection">
        <ImageUpload />
      </div>
    </div>
  );
};

export default Home;
