/**
 * @description 数据库的连接配置
 * @author edison
 */

const { isDev, notDev, isProd, notProd } = reuqire("../utils/env")

// redis地址就是 127.0.0.1:6379
let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1"
}

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  }
}

// 输出redis配置
module.exports = {
  REDIS_CONF
}
