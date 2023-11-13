import { IsNotEmpty, IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  clientId: string;

  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  address: string;
  
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
