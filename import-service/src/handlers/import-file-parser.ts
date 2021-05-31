import { S3 } from 'aws-sdk';
import { HEADERS } from '../shared/constants';
import * as csv from 'csv-parser';

export const importFileParser = (event):any => {
  console.log('event', JSON.stringify(event));

  try {
    event.Records.forEach((record) => {
      console.log(`file: ${record.s3.object.key}`);

      const s3 = new S3({ region: process.env.REGION });
      const s3Object = s3.getObject({
        Bucket: process.env.BUCKET_NAME,
        Key: record.s3.object.key,
      });

      const stream = s3Object.createReadStream();

      stream
        .pipe(csv())
        .on('open', () => console.log(`Parsing file`))
        .on('data', (data) => console.log('csv-parser data:', data))
        .on('error', (error) => {
          console.log('some error', error);
        })
        .on('end', async () => {
          const newKey = record.s3.object.key.replace(
            process.env.BUCKET_PARSED_FOLDER_NAME,
            process.env.BUCKET_PARSED_FOLDER_NAME
          );

          await s3.copyObject({
            Bucket: process.env.BUCKET_NAME,
            CopySource: `${process.env.BUCKET_NAME}/${record.s3.object.key}`,
            Key: newKey
          })
            .promise();

          await s3.deleteObject({
            Bucket: 'products-storage',
            Key: record.s3.object.key
          })
            .promise();
        });
    });
    } catch (error) {
      console.log('error', error);

      return {
        statusCode: 500,
        body: JSON.stringify(error),
        headers: HEADERS,
      };
    }
}
