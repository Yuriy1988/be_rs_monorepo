import { getProducts } from "./get-products";

describe('get products', () => {
  it('returns products', async () => {
    const result =  await getProducts();
    expect(result.statusCode).toEqual(200);
  });
});
