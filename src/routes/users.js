const router = require('koa-router')()

// 前缀，即下面所有的路由前面都有 /users 前缀
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// post
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  ctx.body = {
    username,
    password
  }
})

module.exports = router
