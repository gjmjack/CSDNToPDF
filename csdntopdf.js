const puppeteer = require('puppeteer');
const fs = require('fs')
let InputFile = null
let URLS = []
let argError = false;
let usage = `
Usage:

node csdntopdf.js [-help] <[-input <file path>]|[-url <[url 1] [,url 2] ... [,url n]>]>

-help : Print command help information.
-input <file path> : Specify a filename which contains urls need to be exported.
-url <[url 1] [,url 2]...[,url n]>] : Specify one or more URLs which need to be exported, each URL will be separated by ','. 

Examples:

node csdntopdf.js # this will print the help information as well
node csdntopdf.js -help # this will print the help information
node csdntopdf.js -input D:\\urls.txt # use a input file to provide urls
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321 # use inline command to export pages

`

for (let j = 0; j < process.argv.length; j++) {
  if (process.argv[j] == '-help') {
    argError = true;
    break;
  }
  if (process.argv[j] == '-input' || process.argv[j] == '-url') {
    if (j + 1 < process.argv.length) {
      if (process.argv[j] == '-input') {
        let filename = process.argv[j + 1]
        if (fs.existsSync(filename)) {
          InputFile = filename;
        }
        else {
          console.error(filename + " not exists.")
          argError = true;
          break;

        }
      }
      else {
        URLS = URLS.concat(process.argv[j + 1].split(','))
      }
    }
    else {
      argError = true;
      break;
    }
  }
}

if (argError || (InputFile == null && URLS.length == 0)) {
  console.log(usage)
  return
}

if (InputFile != null) {
  let filecontent = fs.readFileSync(InputFile, { encoding: 'utf-8', flag: 'r' })
  URLS = URLS.concat(filecontent.split('\r\n'))
}


(async () => {
  try {
    const browser = await puppeteer.launch();
    console.log("Start to exporting PDF files [" + URLS.length + "]")

    const page = await browser.newPage();
    const total = URLS.length;

    for (let j = 0; j < URLS.length; j++) {
      const url = URLS[j];
      console.log("[" + (j + 1) + "/" + total + "] Exporting: " + url)

      try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        let title = await page.title();
        title = title.replace(/[_](.+)的博客[-]CSDN博客$/gi, '')
        title = title.replace(/[\\\/\:\*\?\"\<\>\|？：]/gi, '_')

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
          path: title + '.pdf',
          format: 'A4'
        });
      } catch (error) {
        console.error("[" + (j + 1) + "/" + total + "] Exporting:" + url + " failed")
        console.error(error)
      }
    }

    await browser.close();
    console.log("Exported all pages.")
  } catch (error) {

  }
})();