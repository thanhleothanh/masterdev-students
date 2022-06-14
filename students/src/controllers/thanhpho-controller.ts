import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../errors/bad-request-error';

const { thanhpho } = new PrismaClient();

const getAllThanhpho = async () => {
  const data = await thanhpho.findMany({});
  return data;
};

const getThanhphoByName = async (tenthanhpho: string) => {
  const data = await thanhpho.findFirst({
    where: {
      tenthanhpho,
    },
  });
  if (!data) {
    return null;
  }
  return data;
};

const getThanhphoByID = async (id: number) => {
  const data = await thanhpho.findUnique({
    where: {
      id,
    },
  });
  if (!data) {
    return null;
  }
  return data;
};

const postThanhpho = async (tenthanhpho: string) => {
  try {
    const newThanhpho = await thanhpho.create({
      data: {
        tenthanhpho,
      },
    });
    return newThanhpho;
  } catch (error) {
    throw new BadRequestError(String(error));
  }
};

export { postThanhpho, getAllThanhpho, getThanhphoByName, getThanhphoByID };
