const test1 = 'https://www.baidu.com';
const test2 = 'https://www.taobao.com';
const getPerlog = require('../index.js');
(async () => {
  var t1 = await getPerlog({url:test1, count: 10})
  var t2 = await getPerlog({url:test2, count: 10})
  for(var k in t1) {
    console.log(k, t1[k], t2[k])
  }
})()