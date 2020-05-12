/**
 * @description 连接redis的方法, set 和 get
 * @description 并且还会引用/config/db 配置好的数据库
 */

const redis = require("redis")
const { REDIS_CONF } = require("../config/db")

// 创建一个客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
// 监听错误
redisClient.on("error", err => {
  console.error("redis err", err)
})

/**
 * 
 * @param {string} key key
 * @description get方法会返回一个值,本质上是一个I/O操作,所以会用到异步
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      resolve(val)
    })
  })
  return promise
}

/**
 * 
 * @param {string} key key
 * @param {string} val val
 * @param {num} timeout 过期时间,单位秒
 */
function set(key, val, timeout = 3600) {
  // 核心代码
  redisClient.set(key, val)
  redis.expire(key, timeout)
}

module.exports = {
  set,
  get
}