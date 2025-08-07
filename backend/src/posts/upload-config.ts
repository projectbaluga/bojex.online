import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

export const uploadConfig = {
  storage: diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      cb(null, `${randomUUID()}${ext}`);
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new BadRequestException('Invalid file type'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
};
