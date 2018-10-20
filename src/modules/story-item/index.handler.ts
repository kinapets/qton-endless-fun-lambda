import { IHandlerServices, APIGatewayEventHandler, HttpError } from '../../services/handler.service';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { MongooseService } from '../../services/mongoose.service';
import StoryItemModel from './story-item.model';

import { IAppContainer } from '../..';
import { StoryItemsModel } from './story-item.interfaces';
import { AwsService } from '../../services/aws.service';
import Result from '../result/result.model';
import { ResultsModel } from '../result/result.interfaces';

interface IRekognitionHandlerServices extends IHandlerServices {
  mongooseService: MongooseService;
  awsService: AwsService;
}

interface IRekognitionResult {
  Labels: { Name: string; Confidence: number }[];
}

interface IHandlerData {
  user: string;
  storyItem: StoryItemsModel;
  result: ResultsModel;
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

  private async loadData(event: APIGatewayEvent): Promise<IHandlerData> {
    const user = event.headers.Authorization;
    const storyItemId = event.pathParameters.storyItemId;
    const storyItem = await StoryItemModel.findOne({ _id: storyItemId })
      .lean()
      .exec();
    const result = await Result.findOne({ user: user, storyItemId })
      .lean()
      .exec();
    return { user, storyItem, result };
  }

  private validate({ user, storyItem, result }: IHandlerData) {
    if (!user) {
      throw new HttpError({ statusCode: 401, body: { message: 'Authorization header missing' } });
    }

    if (!storyItem) {
      throw new HttpError({ statusCode: 404, body: { message: 'Story Item not found' } });
    }

    if (result) {
      throw new HttpError({ statusCode: 422, body: { message: 'You cannot passed one point twice' } });
    }
  }

  async process(event: APIGatewayEvent, context: Context) {
    const { user, storyItem, result } = await this.loadData(event);
    this.validate({ user, storyItem, result });

    const image = Buffer.from(event.body.split(',')[1], 'base64');
    const [detectLabelsResult, imageUrl] = await Promise.all([this.awsService.detectLabels(image), this.awsService.uploadToS3(image)]);
    const isValidLabel = this.validateLabel(storyItem, detectLabelsResult);
    if (isValidLabel) {
      await new Result({
        user,
        storyItemId: storyItem._id,
        gameId: storyItem.gameId,
        image: imageUrl,
      }).save();
      return this.response({ body: { labels: detectLabelsResult.Labels, image: imageUrl, storyItemId: storyItem._id } });
    }
    return this.response({ statusCode: 422, body: { message: 'label on photo was not found', labels: detectLabelsResult.Labels } });
  }
}
