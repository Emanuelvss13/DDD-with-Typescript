import { v4 as uuid } from "uuid";
import { Customer } from "../entity/customer";
import { OrderItem } from "../entity/order-item";
import { Order } from "./../entity/order";

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    // if (!customer.isActive()) {
    //   throw new Error("Customer must be active to place orders");
    // }

    const order = new Order(uuid(), customer.id, items);

    customer.addRewardPoints(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}
