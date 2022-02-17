import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../item.entity';

@Module({
  controllers: [ItemController],
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService]
})
export class ItemModule {}
