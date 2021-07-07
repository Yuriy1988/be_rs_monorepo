import type { Serverless } from 'serverless/aws';
require('dotenv').config()

const serverlessConfiguration: Serverless = {
  service: 'product-service',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    lambdaHashingVersion: 20201221,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_USER: process.env.DB_USER,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_NAME: process.env.DB_NAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
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
            path: 'products/{productId}',
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
    createProduct: {
      handler: 'src/handlers/create-product.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
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
