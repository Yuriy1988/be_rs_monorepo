import { Product } from '../interfaces';

import DbManager from '../database/db-manager';

export default class ProductService {
  private dbManager: DbManager;

  constructor() {
    this.dbManager = new DbManager();
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      await this.dbManager.query('BEGIN');

      const result = await this.dbManager.query(
        'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id',
        [
          product.title,
          product.description,
          product.price,
        ]
      );

      const [insertedProduct] = result;
      await this.dbManager.query('INSERT INTO stocks(product_id, count) VALUES ($1, $2)', [
        insertedProduct.id,
        product.count
      ]);

      await this.dbManager.query('COMMIT');

      return {
        id: insertedProduct.id,
        ...product
      };
    } catch (error) {
      await this.dbManager.query('ROLLBACK');

      throw error;
    }
  }

  async getProduct(id: string): Promise<Product> {
    const result = await this.dbManager.query(
      `SELECT products.id, title, description, price, stocks.count FROM products JOIN stocks ON products.id = stocks.product_id WHERE products.id = '${id}';`
    );
    console.log('getProduct result', result);

    return result[0];
  }

  async getProducts(): Promise<Product[]> {
    const result = await this.dbManager.query(
      `SELECT products.id, title, description, price, stocks.count FROM products JOIN stocks ON products.id = stocks.product_id;`
    );
    console.log('result', result);

    return result;
  }
}
