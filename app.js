var data;

module.exports = app => {
  app.addSingleton('weexToken', createToken);
};

function createToken(config, app) {

  /**
   * 获取用户token有效性
   * http://203.90.240.140:6699/index.php?s=/5&page_id=359
   */
  var getUserToken = async function (_this, token, uid) {
    const app = _this.app;
    app.logger.info("egg-weex-token.getUserToken begin" , token);
    try {
      const result = await app.curl(config.url + 'internal/exchange/client/token/check', {
        method: 'GET',
        contentType: 'json',
        timeout: 10000,
        data: {
          token: token,
          user_id: uid
        },
        dataType: 'json',
      });
      if (result == null) {
        app.logger.error("egg-weex-token.getUserToken result null", token);
        return {
          code: 1001,
          data: {},
          message: "weex token result null"
        };
      }
      if (result.data.code != 0) {
        app.logger.error("weex-token.getUserToken result error", result);
        return result.data;
      }
      var data = result.data;
      return {
        code: 0,
        data: result.data.data,
        message: "OK"
      };
    } catch (err) {
      app.logger.error("egg-weex-token.getUserToken error", err);
      return {
        code: 1001,
        data: {},
        message: "weex token error " + err.message
      };
    }
  };

  return {
    getUserToken: getUserToken
  }

}