import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateOrderDTO {

  @IsNotEmpty()
  @IsString()
  productId: string;

  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  address: string;
  propertyToUpdate: any;
}
