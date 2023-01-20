import { Sequelize } from "sequelize-typescript";
import { Order } from "../../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../../domain/checkout/entity/order-item";
import { Customer } from "../../../../../domain/customer/entity/customer";
import { Address } from "../../../../../domain/customer/value-object/address";

import { Product } from "../../../../../domain/product/entity/product";
import { CustomerModel } from "../../../../../infrastructure/db/sequelize/model/customer.model";
import { OrderItemModel } from "../../../../../infrastructure/db/sequelize/model/order-item.model";
import { OrderModel } from "../../../../../infrastructure/db/sequelize/model/order.model";
import { ProductModel } from "../../../../../infrastructure/db/sequelize/model/product.model";
import { CustomerRepository } from "../../../../../infrastructure/repository/customer.repository";
import { OrderRepository } from "../../../../../infrastructure/repository/order.repository";
import { ProductRepository } from "../../../../../infrastructure/repository/product.repository";

describe("Order Repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer");
    const address = new Address("street", 1, "0000", "city");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(await orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: order.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: product.id,
          quantity: orderItem.quantity,
        },
      ],
    });
  });
});
