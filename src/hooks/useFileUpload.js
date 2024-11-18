import { useState } from 'react';

export default function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadFile = async (file) => {
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'k5yibx3v');
    formData.append('cloud_name', 'dhgd2oshh');
    formData.append('resource_type', 'auto');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dhgd2oshh/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      setUploading(false);
      setUploadError('Failed to upload file');
      console.error('Error uploading file to Cloudinary:', error);
      throw error;
    }
  };

  return { uploadFile, uploading, uploadError };
};

