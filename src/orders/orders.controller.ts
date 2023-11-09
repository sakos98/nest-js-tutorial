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
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
  getById(@Param('id') id: string) {
    const order = this.ordersService.getById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
  deleteById(@Param('id') id: string) {
    const existingOrder = this.ordersService.getById(id);

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
  createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    // Tutaj możesz również dodać dodatkową walidację danych
    const order = this.ordersService.createOrder(createOrderDTO);
    return order;
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors[0].toString()) }))
  updateOrder(@Param('id') id: string, @Body() updateOrderDTO: UpdateOrderDTO) {
    // Walidacja czy zamówienie istnieje
    const existingOrder = this.ordersService.getById(id);

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    // Tutaj możesz również dodać dodatkową walidację danych
    const updatedOrder = this.ordersService.updateOrder(id, updateOrderDTO);
    return updatedOrder;
  }
}