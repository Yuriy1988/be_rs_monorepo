import { pathResolver } from '../shared/utils';

export default {
  handler: `${pathResolver(__dirname)}/import-products-file.ts`,
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
