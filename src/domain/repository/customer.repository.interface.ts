import { Customer } from "../entity/customer";
import { IRepositoryInterface } from "./repository-interface";

export interface ICustomerRepository extends IRepositoryInterface<Customer> {}
