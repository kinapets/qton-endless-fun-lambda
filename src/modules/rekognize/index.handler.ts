import { Handler, IHandlerServices } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { MongooseService } from '../../services/mongoose.service';
import * as uuid from 'uuid';
import StoryItemModel from '../story-item/story-item.model';

import * as aws from 'aws-sdk';
import { IAppContainer } from '../..';
import { StoryItemsModel } from '../story-item/story-item.interfaces';

const BUCKET_BASE_URL = 'https://s3-eu-west-1.amazonaws.com/endless-fun-image-storage/';
interface IInfoHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
}

interface IRekognitionResult {
  Labels: { Name: string; Confidence: number }[];
}

export class RekognizeHandler extends Handler<APIGatewayEvent> {
  constructor(services: IInfoHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
  }

  private detectLabels(image: Buffer): Promise<IRekognitionResult> {
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

  private response404(message: string) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message,
      }),
    };
  }

  private validateLabel(storyItem: StoryItemsModel, rekognitionResult: IRekognitionResult) {
    for (const label of rekognitionResult.Labels) {
      if (storyItem.labels.indexOf(label.Name) >= 0) {
        return true;
      }
    }
    return false;
  }

  async process(event: APIGatewayEvent, context: Context) {
    const storyItemId = event.pathParameters.storyItemId;
    const storyItem = await StoryItemModel.findOne({ _id: storyItemId })
      .lean()
      .exec();

    if (!storyItem) {
      return this.response404('Story Item not found');
    }

    const image = Buffer.from(event.body.split(',')[1], 'base64');
    const [result, imageUrl] = await Promise.all([this.detectLabels(image), this.uploadToS3(image)]);

    return this.validateLabel(storyItem, result)
      ? {
          statusCode: 200,
          body: JSON.stringify({ labels: result.Labels, image: imageUrl, storyItemId: storyItemId }),
        }
      : {
          statusCode: 422,
          body: JSON.stringify({
            message: 'label on photo was not found',
            labels: result.Labels,
          }),
        };
  }
}
