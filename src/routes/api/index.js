const path = require('path')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const {
  SECRET
} = require('../../config/constant')
const auth = require('../../middleware/jwt')



router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

//模拟用户登录
router.post('/login', (ctx, next) => {
  const {
    userName,
    password
  } = ctx.request.body
  if (userName === 'zhangsan' && password == '123') {
    const token = jwt.sign({
      userName
    }, SECRET, {
      expiresIn: '1y'
    })
    ctx.body = {
      token
    }
  } else {
    ctx.body = {
      msg: '登录失败'
    }
  }

})

//上传文件 + token 验证
router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file
  //获取文件名字
  //file.path -> 文件的绝对路径
  const basename = path.basename(file.path)
  //ctx.origin -> 域名http://localhost:3000
  ctx.body = {
    url: `${ctx.origin}/${basename}`
  }

})

router.get('/string', auth,async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router