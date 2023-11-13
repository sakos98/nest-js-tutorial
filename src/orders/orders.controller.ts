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
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
    await this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  createOrder(@Body() orderData: CreateOrderDTO) {
    const createdOrder = this.ordersService.createOrder(orderData);
    return createdOrder;
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');
  
    await this.ordersService.updateOrder(id, orderData);
    return { success: true };
  }
}
