import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.ordersService.getById(id);
  }
  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateOrderDTO) {
    return this.ordersService.create(productData);
}
}