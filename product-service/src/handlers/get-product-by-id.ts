import { APIGatewayProxyEvent } from 'aws-lambda';
import ProductService from '../services/product-service';
import { Response } from '../interfaces';
import { HEADERS, ERROR_OBJECT } from '../shared/constants';

export const getProductById = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    const productService = new ProductService();
    const product = await productService.getProduct(event.pathParameters.productId);

    if (product) {
      return {
        statusCode: 200,
        body: JSON.stringify(product),
        headers: HEADERS,
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify(ERROR_OBJECT),
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
