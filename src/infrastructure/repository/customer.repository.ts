import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { ICustomerRepository } from "../../domain/repository/customer.repository.interface";
import { CustomerModel } from "./../db/sequelize/model/customer.model";

export class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zipcode,
        city: entity.address.city,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<void | Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);

    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );

    customer.changeAddress(address);

    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }
      customer.addRewardPoints(customerModel.rewardPoints);

      return customer;
    });
  }
}
