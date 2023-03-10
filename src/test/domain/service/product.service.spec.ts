import { Product } from "../../../domain/product/entity/product";
import { ProductService } from "../../../domain/product/service/product.service";

describe("Product service unit test", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("1", "p1", 10);
    const product2 = new Product("2", "p2", 20);

    let products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
