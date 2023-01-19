import { Order } from "../entity/order";
import { IRepositoryInterface } from "./repository-interface";

export interface IOrderRepository extends IRepositoryInterface<Order> {}
