export const uploadImage = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://95c2-35-240-185-186.ngrok-free.app/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
