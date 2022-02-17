import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Item } from 'src/entities/item.entity';
import { CreateItemDTO } from './item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async create(item: CreateItemDTO): Promise<InsertResult> {
    return await this.itemRepository.insert(item);
  }

  async find(id: number): Promise<Item> | null {
    return await this.itemRepository.findOne({ id: id });
  }

  async update(id: number, item): Promise<UpdateResult> {
    return await this.itemRepository.update(id, item);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.itemRepository.delete(id);
  }
}
