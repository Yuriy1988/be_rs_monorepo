import { APIGatewayProxyEvent } from "aws-lambda";
import S3 from 'aws-sdk/clients/s3';
import { HEADERS } from '../shared/constants';

const bucketName = 'products-storage';

export const importProductsFile = async (event: APIGatewayProxyEvent):Promise<any> => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "validation error",
        }, null, 2),
        headers: HEADERS,
      };
    }

    const { name } = event.queryStringParameters;

    const s3 = new S3({ region: 'eu-west-1' });

    const signedUrl = await s3.getSignedUrlPromise('putObject',  {
      Bucket: bucketName,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: "text/csv"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        signedUrl,
      }, null, 2),
      headers: Headers,
    };
  } catch(error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server error!",
      }, null, 2),
      headers: Headers,
    };
  }
};
