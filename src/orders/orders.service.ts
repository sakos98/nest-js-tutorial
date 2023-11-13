import { PrismaService } from 'src/shared/services/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) { }

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({ include: { product: true, client: true } });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async createOrder(
    orderData: CreateOrderDTO,
  ): Promise<Order> {
    const { productId, clientId, quantity, ...otherData } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
          quantity: quantity,
        } as any, // Użyj rzutowania na typ, aby uniknąć problemów z typowaniem
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Produkt nie istnieje");
      throw error;
    }
  }

  public updateOrder(
    id: Order['id'],
    orderData: UpdateOrderDTO,
  ): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
    });
  }
}
