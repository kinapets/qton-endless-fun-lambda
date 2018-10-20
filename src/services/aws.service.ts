import { IAppContainer } from '..';
import { IHandlerService } from './handler.service';
import * as aws from 'aws-sdk';
import * as uuid from 'uuid';

interface IConfig {
  rekognition: {
    region: string;
  };
  s3: {
    bucket: string;
  };
}

interface IRekognitionResult {
  Labels: { Name: string; Confidence: number }[];
}

const BUCKET_BASE_URL = 'https://s3-eu-west-1.amazonaws.com/endless-fun-image-storage/';

export class AwsService implements IHandlerService {
  private s3: aws.S3;
  private rekognition: aws.Rekognition;
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  public async register(container: IAppContainer) {
    this.rekognition = new aws.Rekognition({ region: this.config.rekognition.region });
    this.s3 = new aws.S3();
  }

  public detectLabels(image: Buffer): Promise<IRekognitionResult> {
    return new Promise((resolve, reject) => {
      this.rekognition.detectLabels({ Image: { Bytes: image } }, (err, data) => {
        return err ? reject(err) : resolve(<any>data);
      });
    });
  }

  public async uploadToS3(image: Buffer) {
    const id = uuid.v4();
    await this.s3
      .putObject({
        Bucket: this.config.s3.bucket,
        Key: id,
        Body: image,
        ACL: 'public-read',
      })
      .promise();
    return BUCKET_BASE_URL + id;
  }
}
