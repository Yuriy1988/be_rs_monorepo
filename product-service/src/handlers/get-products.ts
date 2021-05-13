import { HEADERS } from '../shared/constants';
import ProductService from '../services/product-service';
import { Response } from '../interfaces';

export const getProducts = async ():Promise<Response> => {
  const productService = new ProductService();

  try {
    const products = await productService.getProducts();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: HEADERS,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
      headers: HEADERS,
    };
  }

};
