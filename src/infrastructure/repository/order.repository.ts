import { Order } from "../../domain/entity/order";
import { IOrderRepository } from "../../domain/repository/order.repository.interface";

export class OrderRepository implements IOrderRepository {
  create(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<void | Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
