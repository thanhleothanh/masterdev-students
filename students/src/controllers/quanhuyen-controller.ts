import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../errors/bad-request-error';
import { getThanhphoByName, postThanhpho } from './thanhpho-controller';

const { quanHuyen } = new PrismaClient();

const getAllQuanhuyen = async () => {
  const data = await quanHuyen.findMany({});
  return data;
};

const getQuanhuyenByName = async (tenquanhuyen: string) => {
  const data = await quanHuyen.findFirst({
    where: {
      tenquanhuyen,
    },
  });
  if (!data) {
    return null;
  }
  return data;
};

const getQuanhuyenByID = async (id: number) => {
  const data = await quanHuyen.findUnique({
    where: {
      id,
    },
  });
  if (!data) {
    return null;
  }
  return data;
};

const postQuanhuyen = async (tenthanhpho: string, tenquanhuyen: string) => {
  let newQuanhuyen;
  const thanhphoData = await getThanhphoByName(tenthanhpho);

  try {
    if (!thanhphoData) {
      const newThanhpho = await postThanhpho(tenthanhpho);
      newQuanhuyen = await quanHuyen.create({
        data: {
          tenquanhuyen,
          thanhphoId: newThanhpho.id,
        },
      });
    } else {
      newQuanhuyen = await quanHuyen.create({
        data: {
          tenquanhuyen,
          thanhphoId: thanhphoData.id,
        },
      });
    }
    return newQuanhuyen;
  } catch (error) {
    throw new BadRequestError(String(error));
  }
};

export { postQuanhuyen, getAllQuanhuyen, getQuanhuyenByName, getQuanhuyenByID };
