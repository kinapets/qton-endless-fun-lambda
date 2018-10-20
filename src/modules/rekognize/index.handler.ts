import { Handler, IHandlerServices } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { MongooseService } from '../../services/mongoose.service';
import * as uuid from 'uuid';

import * as aws from 'aws-sdk';
import { IAppContainer } from '../..';

const BUCKET_BASE_URL = 'https://s3-eu-west-1.amazonaws.com/endless-fun-image-storage/';
interface IInfoHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

export class RekognizeHandler extends Handler<APIGatewayEvent> {
  constructor(services: IInfoHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  private detectLabels(image: Buffer): Promise<{ Labels: { Name: string; Confidence: number } }> {
    return new Promise((resolve, reject) => {
      const rekognition = new aws.Rekognition({ region: 'eu-west-1' });
      rekognition.detectLabels({ Image: { Bytes: image } }, (err, data) => {
        return err ? reject(err) : resolve(<any>data);
      });
    });
  }

  private async uploadToS3(image: Buffer) {
    const s3 = new aws.S3();
    const id = uuid.v4();
    await s3
      .putObject({
        Bucket: 'endless-fun-image-storage',
        Key: id,
        Body: image,
        ACL: 'public-read',
      })
      .promise();
    return BUCKET_BASE_URL + id;
  }

  async process(event: APIGatewayEvent, context: Context) {
    const image = Buffer.from(event.body.split(',')[1], 'base64');
    const result = await this.detectLabels(image);
    const imageUrl = await this.uploadToS3(image);

    return {
      statusCode: 200,
      body: JSON.stringify({ labels: result.Labels, image: imageUrl }),
    };
  }
}
