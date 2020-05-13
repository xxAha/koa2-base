/**
 * @description 自动加载路由
 */

const requireDirectory = require('require-directory')
const Router = require('koa-router')

function initLoadRouters(app) {
    // process.cwd() -> 获取根路径 和 __dirname 不同 dirname是当前文件所在的路径
    const apiDirectory = `${process.cwd()}/src/routes/`
    requireDirectory(module, apiDirectory, {
      visit: function (obj) {
        if (obj instanceof Router) {
          //InitManager.app.use(obj.routes())
          app.use(obj.routes())
        } else if (typeof obj === 'object') {
          for (let k in obj) {
            if (obj[k] instanceof Router) {
              //InitManager.app.use(obj[k].routes())
              app.use(obj[k].routes())
            }
          }
        }
      }
    })
}

module.exports = initLoadRouters