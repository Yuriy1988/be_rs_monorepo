import { APIGatewayProxyEvent } from 'aws-lambda';
import ProductService from '../services/product-service';
import { Response } from '../interfaces';
import { HEADERS, ERROR } from '../shared/constants';

export const getProductById = async (event: APIGatewayProxyEvent): Promise<Response> => {
  try {
    const productService = new ProductService();
    console.log('getProductById', event.pathParameters.productId);

    if (!event.pathParameters.productId) {
      return {
        statusCode: 404,
        body: JSON.stringify(ERROR.BAD_REQUEST),
        headers: HEADERS,
      };
    }

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
      body: JSON.stringify(ERROR.NOT_EXIST),
      headers: HEADERS,
    };
  } catch(error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers: HEADERS,
    };
  }
};
