const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // ejs的渲染发生在这里,index是index.ejs,title是将传给index.ejs的字符串
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// 返回json格式
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 个人主页
// 需要使用到动态参数
router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params
  console.log(ctx.params)
  ctx.body = {
    title: 'koa2 json',
    username,
    ctx
  }
})

// 加载更多
// 比如说加载到第几页,就要显示第几页
// 这里也是动态参数,但是动态参数并不是一个,获取方法和上面也是一样,ctx.params
router.get('/loadMore/:username/:pageIndex', async (ctx, next) => {
  const { username, pageIndex } = ctx.params
  ctx.body = {
    username,
    pageIndex
  }
})

module.exports = router
