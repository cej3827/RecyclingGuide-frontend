import React, { useState } from 'react';
import { uploadImage } from '../services/api.ts';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [detectedItems, setDetectedItems] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      try {
        const response = await uploadImage(file);
        setResult(`data:image/png;base64,${response.image}`);
        setDetectedItems(response.detected_items);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <form className="uploadSection" onSubmit={handleSubmit}>
        <input className="input" type="file" onChange={handleFileChange} accept="image/*" />
        <button className="button" type="submit" disabled={!file}>Upload</button>
      </form>
      {result && (
        <div className="resultSection">
          <img src={result} alt="Result" style={{ maxWidth: '40vw' }} />
          <h3>탐지된 객체</h3>
          <div className="resultSection2">
            <ul>
              {detectedItems.map((item, index) => (
                <li key={index}>
                  <strong>객체:</strong> {item.label} <br />
                  <strong>신뢰도:</strong> {(item.confidence * 100).toFixed(2)}% <br />
                  <strong>분리배출 방법:</strong> {item.recycling_tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
