import { Product } from "../entity/product";
import { IRepositoryInterface } from "./repository-interface";

export interface IProductRepositoryInterface
  extends IRepositoryInterface<Product> {}
