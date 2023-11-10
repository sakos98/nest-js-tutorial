import {
  Controller,
  Get,
  Delete,
  Param,
  NotFoundException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Product not found');
    return order;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  createOrder(@Body() productData: CreateOrderDTO) {
    const createdProduct = this.ordersService.createOrder(productData);
    return createdProduct;
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Product not found');
  
    await this.ordersService.updateOrder(id, productData);
    return { success: true };
  }
}