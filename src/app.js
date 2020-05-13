const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaBody = require('koa-body')

// error handler
onerror(app)

app.use(koaBody({
  //使用文件上传
  multipart: true,
  //koa-body 里引入了第三方模块 formidable(node-formidable)
  //formidable 的配置可以查
  formidable: {
    //上传目录
    uploadDir: path.join(__dirname, '../uploadFiles'),
    //是否保留文件后缀名
    keepExtensions: true
  }
}))

// middlewares
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, 'public')))
app.use(require('koa-static')(path.resolve(__dirname, '../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))



//自动加载路由
const initLoadRouters = require('../src/routes/core/init')
initLoadRouters(app)

//app.use(userRouter.routes(), userRouter.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app