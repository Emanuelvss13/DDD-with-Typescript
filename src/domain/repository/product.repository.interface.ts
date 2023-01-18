import { Product } from "../entity/product";
import { RepositoryInterface } from "./repository-interface";

export interface IProductRepositoryInterface
  extends RepositoryInterface<Product> {}
