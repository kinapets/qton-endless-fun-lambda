import * as fs from 'fs';
import * as aws from 'aws-sdk';

describe('recognition service test', () => {
  it('should recognize image', (done) => {
    const request = JSON.parse(fs.readFileSync(__dirname + `/mock.request.json`, 'utf8'));
    const image = Buffer.from(request.body, 'base64');

    const rekognition = new aws.Rekognition({ region: 'eu-west-1' });
    rekognition.detectLabels({ Image: { Bytes: image } }, (data, err) => {
      done();
    });
  });
});
