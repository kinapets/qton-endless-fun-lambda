import { hello } from './index';
describe('Index handler test', () => {
  it('should go through', () => {
    hello(<any>{ test: 'test' }, <any>{}, () => {});
  });
});
