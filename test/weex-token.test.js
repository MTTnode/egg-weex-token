'use strict';

const mock = require('egg-mock');

describe('test/weex-token.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/weex-token-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, weexToken')
      .expect(200);
  });
});
