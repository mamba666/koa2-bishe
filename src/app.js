/**
 * 业务
 */

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 从routes文件夹引入路由
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 将public文件夹注册为静态化
// 可以通过这个地址访问静态资源
// http://localhost:3000/stylesheets/style.css
app.use(require('koa-static')(__dirname + '/public'))

// 注册ejs
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// 中间件的演示,和上面的logger()是一样的
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
// 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
