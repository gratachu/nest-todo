import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { InsertResult, UpdateResult } from 'typeorm';
import { CreateItemDTO, UpdateItemDTO } from './item.dto';
import { Item } from 'src/entities/item.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  async getItemList(): Promise<Item[]> {
    return await this.service.findAll();
  }

  @Post()
  async addItem(@Body() item: CreateItemDTO): Promise<InsertResult> {
    return await this.service.create(item);
  }

  @Get(':id')
  async getItem(@Param('id') id: string): Promise<Item> {
    return await this.service.find(Number(id));
  }

  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() itemData: UpdateItemDTO,
  ): Promise<UpdateResult> {
    const newData = !itemData.isDone
      ? itemData
      : {
          ...itemData,
          ...{ isDone: itemData.isDone.toLowerCase() === 'true' },
        };
    return await this.service.update(Number(id), newData);
  }
}
