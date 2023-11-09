import { Injectable, NotFoundException } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';

@Injectable()
export class OrdersService {
  orders: any;
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((p) => p.id === id);
  }

  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((p) => p.id !== id);
  }

  public createOrder(createOrderDTO: CreateOrderDTO) {
    const order = {
      id: uuidv4(),
      ...createOrderDTO,
    };

    db.orders.push(order);
    return order;
  }

  public updateOrder(id: string, updateOrderDTO: UpdateOrderDTO) {
    const existingOrder = this.getById(id);
  
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }
    Object.assign(existingOrder, updateOrderDTO);
    return existingOrder;
  }
}