import { APIGatewayProxyEvent } from "aws-lambda";
import { HEADERS, ERROR } from '../shared/constants';
import { isNil } from 'ramda';
import ProductService from '../services/product-service';
import {Product, Response} from '../interfaces';

export const createProduct = async (event: APIGatewayProxyEvent):Promise<Response> => {
  const productService = new ProductService();

  try {
    console.log('createProduct', event.body);
    const body = JSON.parse(event.body);
    const isInvalid = [body.title, body.description, body.count, body.price].some(isNil)

    if (isInvalid) {
      return {
        statusCode: 400,
        body: JSON.stringify(ERROR.BAD_REQUEST),
        headers: HEADERS,
      };
    }

    const product = await productService.createProduct(body as Product);

    if (product) {
      return {
        statusCode: 200,
        body: JSON.stringify(product),
        headers: HEADERS,
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify(ERROR.WRONG),
      headers: HEADERS,
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(ERROR.WRONG),
      headers: HEADERS,
    };
  }
};
