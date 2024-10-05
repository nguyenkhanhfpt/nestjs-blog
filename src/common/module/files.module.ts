import { Module } from '@nestjs/common';
import { FilesService } from '../service/files.service';

@Module({
  imports: [],
  providers: [FilesService],
  exports: [FilesService],
})
export class FileModule {}
