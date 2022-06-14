import React, { useState } from 'react';
import HocsinhTable from '../components/HocsinhTable';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';

const HomeScreen = () => {
  const [newFile, setNewFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccessUpload, setIsSuccessUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  const changeHandler = (event) => {
    setNewFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append('hocsinhxlsx', newFile);

    try {
      setIsUploading(true);
      const { data } = await axios.post('/api/v1/hocsinh/upload', formData);
      console.log(data);
      setIsSuccessUpload(true);
      setIsUploading(false);
    } catch (error) {
      console.error(JSON.stringify(error));
      setErrorUpload(String(error));
      setIsSuccessUpload(false);
      setIsUploading(false);
    }

    setTimeout(() => {
      setErrorUpload(null);
      setIsSuccessUpload(false);
      setIsUploading(false);
    }, 3000);
  };

  return (
    <div className='flex flex-col w-full px-4 mt-10 lg:px-10'>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col'>
          <label className='text-lg font-medium lg:text-xl lg:'>
            Chọn file học sinh (.xlsx)
          </label>
          <input
            type='file'
            id='hocsinhxlsx'
            name='hocsinhxlsx'
            onChange={changeHandler}
          />
          <button
            onClick={handleSubmission}
            className='w-40 px-6 py-1 mt-3 font-medium text-white bg-yellow-500 rounded-lg'
          >
            Tải file lên!
          </button>
        </div>
        <div className='w-full'>
          {!isSuccessUpload && !errorUpload ? (
            <Message type='info'>
              Chỉ chọn file excel, speadsheetml có dạng đuôi .xlsx!
            </Message>
          ) : isSuccessUpload ? (
            <Message>Tải file lên thành công!</Message>
          ) : (
            errorUpload && <Message type='alert'>{errorUpload}</Message>
          )}
        </div>
      </div>
      <div className='w-full'>
        <HocsinhTable isSuccessUpload={isSuccessUpload} />
      </div>
    </div>
  );
};

export default HomeScreen;