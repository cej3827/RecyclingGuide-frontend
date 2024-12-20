  //서버로 파일 전송,  버튼 클릭 시 실행되는 함수, 비동기 함수
  export const uploadImage = async (image: File) => {
    const formData = new FormData(); //브라우저 API로, 파일과 같은 데이터를 전송하기 위해 사용
    formData.append('file', image); //파일 데이터를 file이라는 이름으로 추가
  
    //서버와 HTTP 통신을 하기 위한 함수
    //await 키워드는 비동기 작업이 완료될 때까지 기다리는 역할
    const response = await fetch('http://localhost:8000/upload', {//요청을 보낼 서버의 주소
      method: 'POST',
      body: formData,
    });
  
    return response.json(); 
};
  