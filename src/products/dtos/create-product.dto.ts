import { Transform } from 'class-transformer';
import {
  IsInt,
  IsString,
  Length,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => {
    return value;
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (value === '') {
      return null; 
    } else {
      return value;
    }
  })
  description: string;
}
