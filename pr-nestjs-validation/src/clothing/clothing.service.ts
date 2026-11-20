import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';
import { ClothingEntity } from './entities/clothing.entity';

@Injectable()
export class ClothingService {
  constructor(
    @InjectRepository(ClothingEntity)
    private readonly clothingRepository: Repository<ClothingEntity>,
  ) {}

  async create(createClothingDto: CreateClothingDto): Promise<ClothingEntity> {
    const clothing = this.clothingRepository.create(createClothingDto);
    return this.clothingRepository.save(clothing);
  }

  async findAll(): Promise<ClothingEntity[]> {
    return this.clothingRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<ClothingEntity> {
    const clothing = await this.clothingRepository.findOneBy({ id });
    if (!clothing) {
      throw new NotFoundException(`Clothing with ID ${id} not found`);
    }

    return clothing;
  }

  async update(
    id: string,
    updateClothingDto: UpdateClothingDto,
  ): Promise<ClothingEntity> {
    const clothing = await this.findOne(id);
    this.clothingRepository.merge(clothing, updateClothingDto);
    return this.clothingRepository.save(clothing);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.clothingRepository.delete(id);
  }
}
