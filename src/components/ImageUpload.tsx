import React, { useState } from 'react';
import { uploadImage } from '../services/api.ts';
// import '../styles/ImageUpload.css'

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null); //초기값 Null
  const [result, setResult] = useState<any>(null);

  //이미지 업로드 처리
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => { //<input> 태그에서 발생하는 이벤트를 처리하기 위한 타입
    if (event.target.files) { //업로드된 파일 목록을 가져옴
      setImage(event.target.files[0]); //여러 파일 중 첫 번째 파일을 상태로 저장, image 상태를 업데이트
    }
  };

  const handleSubmit = async () => {
    if (image) { //파일이 선택 되었다면
      const data = await uploadImage(image);
      console.log(data);
      setResult(data);
    }
  };

  //UI 렌더링
  return (
    <div className="uploadSection">
      <input className="input" type="file" accept="image/*" onChange={handleImageUpload} />
      <button className="button" onClick={handleSubmit}>분석하기</button>

      {result && (
        <div className="resultSection">
          <h3>분석 결과</h3>
          <ul>
            {result.detections.map((item: { class: string; confidence: number }, index: number) => (
              <li key={index}>
                {item.class} - {item.confidence} ({result.guides[index]})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

// 사용자가 이미지를 선택 → handleImageUpload 실행 → 선택한 이미지 파일을 image 상태에 저장.
// 사용자가 버튼 클릭 → handleSubmit 실행 → 이미지를 서버로 전송.
// 서버의 응답을 받아 콘솔에 출력.