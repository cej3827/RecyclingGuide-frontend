// 이미지 업로드 함수
export const uploadImage = async (file: File): Promise<any> => {
  // FormData 객체 생성
  const formData = new FormData();
  formData.append("file", file);

  try {
    // 서버에 POST 요청 보내기
    const response = await fetch("https://57db-34-148-112-234.ngrok-free.app/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    // 응답을 JSON으로 파싱하여 반환
    return await response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
