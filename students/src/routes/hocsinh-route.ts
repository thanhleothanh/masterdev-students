import express, { NextFunction, Request, Response } from 'express';
import readXlsxFile from 'read-excel-file/node';

import { NotFoundError } from '../errors/not-found-error';
import {
  getAllHocsinh,
  getHocsinhByID,
  postHocsinh,
} from '../controllers/hocsinh-controller';
import { BadRequestError } from '../errors/bad-request-error';
import { uploadFile } from '../middlewares/upload';

const router = express.Router();

router.get(
  '/api/v1/hocsinh',
  async (req: Request, res: Response, next: NextFunction) => {
    const { hovaten = '' } = req.query;
    const data = await getAllHocsinh(String(hovaten));
    res.status(200).json(data);
  }
);

router.post(
  '/api/v1/hocsinh/upload',
  uploadFile.single('hocsinhxlsx'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file == undefined) {
        throw new BadRequestError('Please upload a xlsx file!');
      }
      const pathDir = `./uploads/${req.file.filename}`;
      readXlsxFile(pathDir).then((rows) => {
        // skip header
        rows.shift();
        rows.shift();
        rows.shift();
        rows.shift();
        rows.shift();
        rows.forEach(async (row) => {
          let hocsinh = {
            truong: String(row[1]),
            quanhuyen: String(row[2]),
            mahocsinh: String(row[3]),
            lop: String(row[4]),
            hovaten: String(row[5]),
            ngaysinh: row[6],
            thangsinh: row[7],
            namsinh: row[8],
            gioitinh: String(row[9]),
            noisinh: String(row[10]),
            dantoc: String(row[11]),
            hokhauthuongtru: String(row[12]),
            dienthoailienhe: String(row[13]),
            tongdiemlop1: row[14],
            tongdiemlop2: row[15],
            tongdiemlop3: row[16],
            tongdiemlop4: row[17],
            tongdiemlop5: row[18],
            tongdiem5nam: row[19],
            diemuutien: row[20],
            tongdiemsotuyen: row[21],
            ghichu: String(row[22]),
          };
          await postHocsinh(hocsinh);
        });
      });
      res.status(201).json({
        message: 'file uploaded!',
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestError(
        'Kiểm tra lại loại file! chỉ tải lên file sheet, xlsx...'
      );
    }
  }
);

router.post(
  '/api/v1/hocsinh',
  async (req: Request, res: Response, next: NextFunction) => {
    const newHocsinh = await postHocsinh({
      ...req.body,
    });
    res.status(201).json(newHocsinh);
  }
);

router.get(
  '/api/v1/hocsinh/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = await getHocsinhByID(parseInt(id));
    if (!data) {
      throw new NotFoundError('No hocsinh found with this ID');
    }
    res.status(200).json(data);
  }
);
export { router as hocsinhRouter };
