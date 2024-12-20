import React from 'react';
import ImageUpload from '../components/ImageUpload.tsx';
import '../styles/ImageUpload.css'

const Home = () => {
  return (
    <div>
      <header className="header">
        <h1>Recycling Guide System</h1>
      </header>
      <div className="uploadSection">
        <ImageUpload />
      </div>
    </div>
  );
};

export default Home;
