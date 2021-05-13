import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    lambdaHashingVersion: 20201221,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    getProductList: {
      handler: 'src/handlers/get-products.getProducts',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
          },
        }

      ]
    },
    getProductById: {
      handler: 'src/handlers/get-product-by-id.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: 'product/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }
              }
            },
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration;
