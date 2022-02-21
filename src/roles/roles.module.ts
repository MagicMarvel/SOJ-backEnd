import { Global, Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

@Global()
@Module({
  providers: [RolesGuard],
})
export class RolesModule {}
