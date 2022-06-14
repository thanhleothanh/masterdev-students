import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../errors/bad-request-error';

const { truong } = new PrismaClient();

const getAllTruong = async () => {
  const data = await truong.findMany({});
  return data;
};

const getTruongByName = async (tentruong: string) => {
  const data = await truong.findFirst({
    where: {
      tentruong,
    },
  });
  if (!data) {
    return null;
  }
  return data;
};

const getTruongByID = async (id: number) => {
  const data = await truong.findUnique({
    where: {
      id,
    },
  });
  if (!data) {
    return null;
  }
  return data;
};

const postTruong = async (tentruong: string) => {
  try {
    const data = await truong.create({
      data: {
        tentruong,
      },
    });
    return data;
  } catch (error) {
    throw new BadRequestError(String(error));
  }
};

export { postTruong, getAllTruong, getTruongByName, getTruongByID };
