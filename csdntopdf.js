const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://blog.csdn.net/gjmjack/article/details/120338321', { waitUntil: 'networkidle2' });
    await page.addStyleTag(
      {
        content: `
        .recommend-box.insert-baidu-box,
        div.comment-box,
        .second-recommend-box.recommend-box,
        .first-recommend-box.recommend-box,
        div.blog-footer-bottom,
        #toolBarBox,
        div.csdn-side-toolbar,
        aside.blog_container_aside,
        #csdn-toolbar{
          display:none !important;
        }
        .nodata .container main {width: 90% !important;}
        .nodata .container {
          width: 100% !important;
          display:flex;
          justify-content:center;
          padding:0;
        }
          `
      })

    await page.pdf({
      path: '如何一行代码（脚本）刷抖音快手视频？老司机教你如何薅羊毛（二）【多线程版】.pdf',
      format: 'A4'
    });


    await browser.close();
  } catch (error) {
  }
})();