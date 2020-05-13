/**
 * @description 存储配置
 * @author 双越老师
 */

const {
  isProd
} = require('../utils/env')

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '19881115',
  port: '3306',
  database: 'test_db'
}

if (isProd) {

  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: '139.199.55.185',
    user: 'root',
    password: '19881115',
    port: '3306',
    database: 'test_db_prd'
  }

}

module.exports = {
  MYSQL_CONF
}