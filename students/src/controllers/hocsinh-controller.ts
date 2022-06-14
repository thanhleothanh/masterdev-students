import { PrismaClient } from '@prisma/client';

import { getTruongByName, postTruong } from '../controllers/truong-controller';
import {
  getQuanhuyenByName,
  postQuanhuyen,
} from '../controllers/quanhuyen-controller';
import {
  getThanhphoByName,
  postThanhpho,
} from '../controllers/thanhpho-controller';
import { BadRequestError } from '../errors/bad-request-error';
const { hocsinh, diemsotuyen, ngaysinh: ngaysinhPrisma } = new PrismaClient();

const getAllHocsinh = async (hovaten: string = '') => {
  let data = null;
  if (hovaten == '') {
    data = await hocsinh.findMany({
      include: {
        truong: true,
        thanhpho: true,
        diemsotuyen: true,
        ngaysinh: true,
        quanhuyen: true,
      },
    });
  } else
    data = await hocsinh.findMany({
      where: {
        hovaten: {
          contains: hovaten,
        },
      },
      include: {
        truong: true,
        thanhpho: true,
        diemsotuyen: true,
        ngaysinh: true,
        quanhuyen: true,
      },
    });
  return data;
};

const getHocsinhByID = async (id: number) => {
  const data = await hocsinh.findUnique({
    where: {
      id,
    },
    include: {
      truong: true,
      thanhpho: true,
      diemsotuyen: true,
      ngaysinh: true,
      quanhuyen: true,
    },
  });
  if (!data) return null;
  return data;
};

const getHocsinhByName = async (hovaten: string) => {
  const data = await hocsinh.findMany({
    where: {
      hovaten,
    },
    include: {
      truong: true,
      thanhpho: true,
      diemsotuyen: true,
      ngaysinh: true,
      quanhuyen: true,
    },
  });
  return data;
};

const postHocsinh = async (newHocsinh: any) => {
  const {
    mahocsinh,
    hovaten,
    gioitinh,
    dantoc,
    lop,
    hokhauthuongtru,
    dienthoailienhe,
    ghichu,
    tongdiemlop1,
    tongdiemlop2,
    tongdiemlop3,
    tongdiemlop4,
    tongdiemlop5,
    tongdiem5nam,
    diemuutien,
    tongdiemsotuyen,
    ngaysinh,
    thangsinh,
    namsinh,
    noisinh,
    truong,
    quanhuyen,
  } = newHocsinh;
  try {
    let truongData = await getTruongByName(truong);
    if (!truongData) truongData = await postTruong(truong);

    let quanhuyenData = await getQuanhuyenByName(quanhuyen);
    if (!quanhuyenData) quanhuyenData = await postQuanhuyen(noisinh, quanhuyen);

    let noisinhData = await getThanhphoByName(noisinh);
    if (!noisinhData) noisinhData = await postThanhpho(noisinh);

    const newHocsinh = await hocsinh.create({
      data: {
        mahocsinh: mahocsinh,
        hovaten: hovaten,
        dantoc: dantoc,
        lop: lop,
        hokhauthuongtru: hokhauthuongtru,
        dienthoailienhe: dienthoailienhe,
        gioitinh: gioitinh,
        ghichu: ghichu,
        truongId: truongData.id,
        quanhuyenId: quanhuyenData.id,
        noisinh: noisinhData.id,
      },
    });

    await ngaysinhPrisma.create({
      data: {
        hocsinhId: newHocsinh.id,
        ngay: ngaysinh,
        thang: thangsinh,
        nam: namsinh,
      },
    });

    await diemsotuyen.create({
      data: {
        hocsinhId: newHocsinh.id,
        tongdiemlop1,
        tongdiemlop2,
        tongdiemlop3,
        tongdiemlop4,
        tongdiemlop5,
        tongdiemsotuyen,
        diemuutien,
        tongdiem5nam,
      },
    });

    return newHocsinh;
  } catch (error) {
    throw new BadRequestError(String(error));
  }
};

export { postHocsinh, getAllHocsinh, getHocsinhByID, getHocsinhByName };
