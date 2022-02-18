import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { CreateItemDTO, UpdateItemDTO, DeleteItemDTO } from './item.dto';
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

  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.service.delete(Number(id));
  }

  @Post(':id/delete')
  async deleteItem(@Param('id') id: string, @Body() deleteItem: DeleteItemDTO) {
    const item = await this.service.find(Number(id));
    // 先にエラーを返してあげる
    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `missing item (id: &{id}).`,
        },
        404,
      );
    }
    try {
      await this.service.deleteByPassword(
        Number(id),
        deleteItem.deletePassword,
      );
    } catch (e) {
      if (e.message === 'incorrect delete password') {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'incorrect delete password',
          },
          403,
        );
      }
    }
    return;
  }
}
