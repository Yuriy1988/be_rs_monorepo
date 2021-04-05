interface Product {
  id: string,
  title: string,
  description: string,
  price: number,
}

interface Response {
  statusCode: number,
  body: string,
  headers: {
    'Access-Control-Allow-Origin': string,
    'Access-Control-Allow-Credentials': boolean,
  },
}

export {
  Product,
  Response,
};
