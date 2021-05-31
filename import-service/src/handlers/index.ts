import { pathResolver } from '../shared/utils';

export const importProductsFile = {
  handler: `${pathResolver(__dirname)}/import-products-file.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        }
      }
    }
  ]
};

export const importFileParser = {
  handler: `${pathResolver(__dirname)}/import-file-parser.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'products-storage',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
            suffix: '.csv'
          }
        ],
        existing: true
      },
    },
  ],
};
