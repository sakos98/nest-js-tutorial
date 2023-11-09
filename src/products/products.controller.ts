import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
  getById(@Param('id') id: string) {
    const product = this.productsService.getById(id);
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    return product;
  }
  
  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
  deleteById(@Param('id') id: string) {
    const existingProduct = this.productsService.getById(id);
  
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
  
    this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {

    // Dodaj ten log przed wywołaniem metody w serwisie
    const createdProduct = this.productsService.create(productData);

    return createdProduct;
  }

  @Put('/:id')
@UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
update(
  @Param('id') id: string,
  @Body() productData: UpdateProductDTO,
) {
  const existingProduct = this.productsService.getById(id);

  if (!existingProduct) {
    throw new NotFoundException('Product not found');
  }

  this.productsService.updateById(id, productData);
  return { success: true };
}

  
  


}
