import React from 'react';
import ImageUpload from '../components/ImageUpload.tsx';
import '../styles/ImageUpload.css'

const Home = () => {
  // 페이지 새로고침을 위한 핸들러 함수
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* 헤더 섹션 */}
      <header className="header" onClick={handleRefresh}>
        <h1>Recycling Guide System</h1>
      </header>
      {/* 이미지 업로드 섹션 */}
      <div className="uploadSection">
        <ImageUpload />
      </div>
    </div>
  );
};

export default Home;
