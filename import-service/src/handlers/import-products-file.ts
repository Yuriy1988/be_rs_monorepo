import { APIGatewayProxyEvent } from "aws-lambda";
import { S3 } from 'aws-sdk';
import { HEADERS, ERROR } from '../shared/constants';

export const importProductsFile = async (event: APIGatewayProxyEvent):Promise<any> => {
  const name = event.queryStringParameters?.name;

  try {
    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify(ERROR.BAD_REQUEST),
        headers: HEADERS,
      };
    }

    const s3 = new S3({ region: process.env.REGION });
    const signedUrl = await s3.getSignedUrlPromise('putObject',  {
      Bucket: process.env.BUCKET_NAME,
      Key: `${process.env.BUCKET_UPLOADED_FOLDER_NAME}/${name}`,
      ContentType: 'text/csv',
      Expires: 60,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(signedUrl),
      headers: HEADERS,
    };
  } catch(error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers: HEADERS,
    };
  }
};
