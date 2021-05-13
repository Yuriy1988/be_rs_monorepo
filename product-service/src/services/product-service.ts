import { Product } from '../interfaces';
import { products } from '../mock-data/data';

export default class ProductService {
  async getProduct(id: string): Promise<Product> {
    return products.find(product => product.id === id);
  }

  async getProducts(): Promise<Product[]> {
    return products;
  }
}
