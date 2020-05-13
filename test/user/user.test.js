const server = require('../server')

test('测试登录', async () => {
  const postData = {
    userName: 'zhangsan',
    password: '123'
  }
  const res = await server
    .post('/login')
    .send(postData)
  const token = res.body.token
  expect(token).not.toBe(undefined)
})