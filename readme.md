added serverless config with lamda functions that return correct data:
- products: https://r1t72o85wg.execute-api.eu-west-1.amazonaws.com/dev/products, 
- product: https://r1t72o85wg.execute-api.eu-west-1.amazonaws.com/dev/product,

fe app is integrated https://d27t9ou7rsaqrn.cloudfront.net (just names were changed to car0, car1, etc)

Async/await is used in lambda functions - done

ES6 modules are used for product-service implementation - done

Webpack is configured for product-service - done

SWAGGER documentation is created for product-service - didn't have time, will do later 

Lambda handlers are covered by basic UNIT tests

Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module

Main error scenarious are handled by API ("Product not found" error, try catch blocks are used in lambda handlers).

I think everything is done but swagger. 
If I have time for it then will add swagger later in couple of days.
