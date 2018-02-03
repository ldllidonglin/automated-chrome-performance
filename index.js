const puppeteer = require('puppeteer')
module.exports = async function getPerformance(options) {
  const default_options = {
    url: '',
    count: 100
  }
  options = Object.assign({}, default_options, options)
  const browser = await puppeteer.launch({headless: false})
  let results = []
  for (var i = 0; i < options.count + 1; i++) {
    const page = await browser.newPage()
    await page.goto(options.url)
    const perlog = await page.evaluate(() => {
      function collectTiming() {
        var times = {}
        var timing = performance.timing
        times.dns = timing.domainLookupEnd - timing.domainLookupStart
        times.tcp = timing.connectEnd - timing.connectStart
        times.doc_req = timing.responseStart - timing.connectEnd
        times.doc_load = timing.responseEnd - timing.responseStart
        times.inter = timing.domInteractive - timing.responseEnd
        times.acm_dom = timing.domComplete - timing.domInteractive
        times.loaded_event = timing.loadEventEnd - timing.domComplete
        times.loaded = timing.loadEventEnd - timing.navigationStart
        if (window.chrome && window.chrome.loadTimes) {
          times.first_paint = 1e3 * window.chrome.loadTimes().firstPaintTime - timing.navigationStart
        } else if(timing.msFirstPaint) {
          times.first_paint = 0
        }
        return times
      }
      return collectTiming(window.performance)
    })
    i > 0 && results.push(perlog)
  }
  let avg = results.reduce(function (item, next, currentIndex) {
    for (let k in item) {
      item[k] += next[k]
      if (currentIndex === results.length - 1) {
        item[k] = item[k] / results.length
      }
    }
    return item
  })
  await browser.close()
  return avg
}


