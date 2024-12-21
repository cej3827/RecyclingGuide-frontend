import React, { useState } from 'react';
import { uploadImage } from '../services/api.ts';
import { TailSpin } from 'react-loader-spinner';

const ImageUpload: React.FC = () => { 
  const [file, setFile] = useState<File | null>(null); // 선택된 파일 상태
  const [result, setResult] = useState<string | null>(null); // 결과 이미지 URL 상태
  const [detectedItems, setDetectedItems] = useState<any[]>([]); // 탐지된 객체 목록 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]); // 선택된 파일을 상태에 저장
    }
  };

  // 폼 제출 시 호출되는 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    if (file) {
      try {
        setIsLoading(true); // 로딩 상태 시작
        const response = await uploadImage(file); // 이미지 업로드 API 호출
        setResult(`data:image/png;base64,${response.image}`); // 결과 이미지 URL 설정
        setDetectedItems(response.detected_items); // 탐지된 객체 목록 설정
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    }
  };

  return (
    <div>
      {/* 이미지 업로드 폼 */}
      <form className="uploadSection" onSubmit={handleSubmit}>
        <input className="input" type="file" onChange={handleFileChange} accept="image/*" />
        <button className="button" type="submit" disabled={!file || isLoading}>
          {isLoading ? '업로드 중...' : '업로드'}
        </button>
      </form>
      {isLoading ? (
        // 로딩 중일 때 스피너 표시
        <div className="loaderContainer">
          <TailSpin color="#00BFFF" height={60} width={60} />
        </div>
      ) : result ? (
        // 결과가 있을 때 결과 이미지와 탐지된 객체 목록 표시
        <div className="resultSection">
          <img src={result} alt="Result" style={{ maxWidth: '40vw' }} />
          <h3>탐지된 객체</h3>
          <div className="resultSection2">
            <ul>
              {detectedItems.map((item, index) => (
                <li key={index}>
                  <strong>객체:</strong> {item.label} <br /><br />
                  <strong>분리배출 방법</strong>
                  <ul className="ulul">
                    {item.recycling_tip.map((tip: string, tipIndex: number) => (
                      <li key={tipIndex}>{tip}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
