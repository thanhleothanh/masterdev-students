import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import multer from 'multer';

const excelFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, 'uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });

export { uploadFile };
