const router = require('koa-router')()

router.get('/view', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

module.exports = router
