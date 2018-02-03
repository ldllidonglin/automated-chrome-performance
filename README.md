# automated-chrome-performance
基于puppeteer自动化采集指定url的性能数据（基于performance api)
* 由于网络环境、浏览器启动等等原因，单次采集的数据会波动，所以采用运行多次取平均值的方式减小误差。默认一个页面会在puppeteer内打开100次，返回平均值。
* 由于第一次启动浏览器话费时间较长，数据明显比后续打开页面采集的数据差异较大，故第一次的数据当脏数据过滤掉。
# example
```
const getPerlog = require('automated-chrome-performance');
const test1 = 'https://www.baidu.com';
const test2 = 'https://www.taobao.com';
(async () => {
  var t1 = await getPerlog({url:test1, count: 10})
  var t2 = await getPerlog({url:test2, count: 10})
  for(var k in t1) {
    console.log(k, t1[k], t2[k])
  }
})()
```
# options
* url
  + 页面url地址
* count
  + 执行次数，默认执行100次