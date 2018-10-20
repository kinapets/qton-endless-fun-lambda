import { IHandlerServices, APIGatewayEventHandler } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { MongooseService } from '../../services/mongoose.service';
import StoryItemModel from './story-item.model';

import { IAppContainer } from '../..';
import { StoryItemsModel } from './story-item.interfaces';
import { AwsService } from '../../services/aws.service';

interface IRekognitionHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
  awsService: AwsService;
}

interface IRekognitionResult {
  Labels: { Name: string; Confidence: number }[];
}

export class RekognizeHandler extends APIGatewayEventHandler {
  private awsService: AwsService;
  constructor(services: IRekognitionHandlerServices, appContainer: IAppContainer) {
    super(services, appContainer);
    this.awsService = services.awsService;
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
      return this.response({ statusCode: 404, body: { message: 'Story Item not found' } });
    }

    const image = Buffer.from(event.body.split(',')[1], 'base64');
    const [result, imageUrl] = await Promise.all([this.awsService.detectLabels(image), this.awsService.uploadToS3(image)]);

    return this.validateLabel(storyItem, result)
      ? this.response({ body: { labels: result.Labels, image: imageUrl, storyItemId: storyItemId } })
      : this.response({ statusCode: 422, body: { message: 'label on photo was not found', labels: result.Labels } });
  }
}
