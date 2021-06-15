import type { Serverless } from 'serverless/aws';
import { importProductsFile, importFileParser } from './src/handlers';
require('dotenv').config();

const serverlessConfiguration: Serverless = {
  service: 'import-service',
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
      BUCKET_NAME: process.env.BUCKET_NAME,
      BUCKET_UPLOADED_FOLDER_NAME: process.env.BUCKET_UPLOADED_FOLDER_NAME,
      BUCKET_PARSED_FOLDER_NAME: process.env.BUCKET_PARSED_FOLDER_NAME,
      REGION: process.env.REGION,
    },
  },
  functions: {
    importProductsFile,
    importFileParser,
  }
}

module.exports = serverlessConfiguration;
