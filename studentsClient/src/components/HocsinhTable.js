import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from './Message';

const getAllHocsinh = async () => {
  const { data } = await axios.get('/api/v1/hocsinh');
  return data;
};

const HocsinhTable = ({ searchString, isSuccessUpload }) => {
  const [allHocsinh, setAllHocsinh] = useState(null);
  const [firstFetch, setFirstFetch] = useState(false);

  useEffect(async () => {
    if (!firstFetch) {
      const data = await getAllHocsinh();
      setAllHocsinh(data);
      setFirstFetch(true);
    }
    if (isSuccessUpload) {
      const data = await getAllHocsinh();
      setAllHocsinh(data);
    }
  }, [isSuccessUpload]);

  return (
    <div className='mx-1 mt-10 overflow-x-auto'>
      <table className='w-full overflow-scroll table-auto'>
        <thead>
          <tr>
            <th className='px-5 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th
              colSpan={3}
              className='py-3 text-center border-4 px-30 tableHead'
            >
              Ngày sinh
            </th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th className='px-10 py-3 border-4 tableHead'></th>
            <th
              colSpan={8}
              className='py-3 text-center border-4 px-30 tableHead'
            >
              Điểm sơ tuyển vòng 1
            </th>
            <th className='px-10 py-3 border-4 tableHead'></th>
          </tr>
          <tr>
            <th className='px-5 border-4 tableHead'>STT</th>
            <th className='px-10 py-1 border-4 tableHead'>Trường tiểu học</th>
            <th className='px-10 py-1 border-4 tableHead'>Quận/Huyện</th>
            <th className='px-10 py-1 border-4 tableHead'>Mã học sinh</th>
            <th className='px-10 py-1 border-4 tableHead'>Lớp</th>
            <th className='px-10 py-1 border-4 tableHead'>Họ và tên</th>
            <th className='px-10 py-1 border-4 tableHead'>Ngày sinh</th>
            <th className='px-10 py-1 border-4 tableHead'>Tháng sinh</th>
            <th className='px-10 py-1 border-4 tableHead'>Năm sinh</th>
            <th className='px-10 py-1 border-4 tableHead'>Giới tính</th>
            <th className='px-10 py-1 border-4 tableHead'>Dân tộc</th>
            <th className='px-10 py-1 border-4 tableHead'>
              Hộ khẩu thường trú
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Điện thoại liên hệ
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm năm lớp 1
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm năm lớp 2
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm năm lớp 3
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm năm lớp 4
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm năm lớp 5
            </th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm kết quả năm 5
            </th>
            <th className='px-10 py-1 border-4 tableHead'>Điểm ưu tiên</th>
            <th className='px-10 py-1 border-4 tableHead'>
              Tổng điểm sơ tuyển
            </th>
            <th className='px-10 py-1 border-4 tableHead'>Ghi chú</th>
          </tr>
        </thead>

        <tbody>
          {allHocsinh &&
            allHocsinh.length != 0 &&
            allHocsinh.map((hocsinh, i) => {
              if (
                searchString == null ||
                hocsinh.mahocsinh
                  .toLowerCase()
                  .includes(searchString.toLowerCase()) ||
                hocsinh.hovaten
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
              )
                return (
                  <tr key={hocsinh.id}>
                    <td className='py-2 border-4 tableCell'>{i + 1}</td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.truong.tentruong}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.quanhuyen.tenquanhuyen}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.mahocsinh}
                    </td>
                    <td className='py-2 border-4 tableCell'>{hocsinh.lop}</td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.hovaten}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.ngaysinh.ngay}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.ngaysinh.thang}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.ngaysinh.nam}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.gioitinh}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.dantoc}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.hokhauthuongtru}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.dienthoailienhe}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiemlop1}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiemlop2}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiemlop3}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiemlop4}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiemlop5}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiem5nam}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.diemuutien || 0}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.diemsotuyen.tongdiemsotuyen}
                    </td>
                    <td className='py-2 border-4 tableCell'>
                      {hocsinh.ghichu}
                    </td>
                  </tr>
                );
            })}
          {!allHocsinh ||
            (allHocsinh.length == 0 && (
              <Message type='info'>
                Không có học sinh nào trong database
              </Message>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HocsinhTable;
