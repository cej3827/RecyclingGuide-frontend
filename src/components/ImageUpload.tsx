import React, { useState } from 'react';
import { uploadImage } from '../services/api.ts';
import { TailSpin } from 'react-loader-spinner';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      try {
        setIsLoading(true);
        const response = await uploadImage(file);
        setResult(`data:image/png;base64,${response.image}`);
        setDetectedItems(response.detected_items);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <form className="uploadSection" onSubmit={handleSubmit}>
        <input className="input" type="file" onChange={handleFileChange} accept="image/*" />
        <button className="button" type="submit" disabled={!file || isLoading}>
          {isLoading ? '업로드 중...' : '업로드'}
        </button>
      </form>
      {isLoading ? (
        <div className="loaderContainer">
          <TailSpin color="#00BFFF" height={60} width={60} />
        </div>
      ) : result ? (
        <div className="resultSection">
          <img src={result} alt="Result" style={{ maxWidth: '40vw' }} />
          <h3>탐지된 객체</h3>
          <div className="resultSection2">
            <ul>
              {detectedItems.map((item, index) => (
                <li key={index}>
                  <strong>객체:</strong> {item.label} <br />
                  <strong>신뢰도:</strong> {(item.confidence * 100).toFixed(2)}% <br />
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
