import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  writeFileSync(file, fileName: string, path: string): string {
    const fileExtension = file.originalname.split('.').pop();
    fs.writeFileSync(`${path}/${fileName}.${fileExtension}`, file.buffer);

    return `${fileName}.${fileExtension}`;
  }
}
