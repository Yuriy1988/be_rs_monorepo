import { getProductById } from "./get-product-by-id";
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('get product by id', () => {
    it('returns product', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const event: APIGatewayProxyEvent = { pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' } };

      const result =  await getProductById(event);
      expect(result.statusCode).toEqual(200);
    });

  it('returns 400th if has no such product', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const event: APIGatewayProxyEvent = { pathParameters: { productId: 'null' } };

    const result =  await getProductById(event);
    expect(result.statusCode).toEqual(404);
  });
});
