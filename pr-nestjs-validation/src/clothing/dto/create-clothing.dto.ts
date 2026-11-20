import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ClothingSize } from '../entities/clothing.entity';

export class CreateClothingDto {
  @IsString({ message: 'Назва товару (title) має бути рядком' })
  @IsNotEmpty({ message: 'Назва товару є обов’язковою' })
  @MinLength(2, { message: 'Мінімальна довжина назви — 2 символи' })
  @MaxLength(150, { message: 'Максимальна довжина назви — 150 символів' })
  readonly title: string;

  @IsNumber({}, { message: 'Ціна (price) має бути числом' })
  @IsPositive({ message: 'Ціна має бути додатним числом більше 0' })
  readonly price: number;

  @IsEnum(ClothingSize, {
    message: 'Розмір (size) має бути одним із значень: XS, S, M, L, XL',
  })
  readonly size: ClothingSize;

  @IsString({ message: 'Матеріал (material) має бути рядком' })
  @IsNotEmpty({ message: 'Матеріал є обов’язковим полем' })
  readonly material: string;

  @IsString({ message: 'Колір (color) має бути рядком' })
  @IsNotEmpty({ message: 'Колір є обов’язковим полем' })
  readonly color: string;
}