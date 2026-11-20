import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ClothingSize } from '../entities/clothing.entity';

export class UpdateClothingDto {
  @IsOptional()
  @IsString({ message: 'Назва товару (title) має бути рядком' })
  @IsNotEmpty({ message: 'Назва товару не може бути порожньою' })
  @MinLength(2, { message: 'Мінімальна довжина назви — 2 символи' })
  @MaxLength(150, { message: 'Максимальна довжина назви — 150 символів' })
  readonly title?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Ціна (price) має бути числом' })
  @IsPositive({ message: 'Ціна має бути додатним числом більше 0' })
  readonly price?: number;

  @IsOptional()
  @IsEnum(ClothingSize, {
    message: 'Розмір (size) має бути одним із значень: XS, S, M, L, XL',
  })
  readonly size?: ClothingSize;

  @IsOptional()
  @IsString({ message: 'Матеріал (material) має бути рядком' })
  @IsNotEmpty({ message: 'Матеріал не може бути порожнім' })
  readonly material?: string;

  @IsOptional()
  @IsString({ message: 'Колір (color) має бути рядком' })
  @IsNotEmpty({ message: 'Колір не може бути порожнім' })
  readonly color?: string;
}