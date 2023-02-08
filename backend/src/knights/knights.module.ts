import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';
import { Knights, KnightsSchema } from './schemas/knights.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Knights.name, schema: KnightsSchema }]),
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
