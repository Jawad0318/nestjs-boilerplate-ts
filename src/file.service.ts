import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class FileService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = 'uploads';
    // if the uploads does not exist than this will create
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // creating name of the file
    const fileName = `${Date.now()}-${file.originalname}`;
    // adding the path to the file
    const filePath = path.join(uploadDir, fileName);
    //saving the file
    await fs.promises.writeFile(filePath, file.buffer);
    // returning the file path
    return filePath;
  }
}
