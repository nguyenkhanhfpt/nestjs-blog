import { Module } from '@nestjs/common';
import { CacheService } from 'src/common/service/cache.services';

@Module({
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
