const puppeteer = require('puppeteer');
const fs = require('fs')
let InputFile = null
let URLS = []
let argError = false;
let injectCss = fs.readFileSync('inject.css', { encoding: 'utf-8', flag: 'r' })
let usage = `

SYNTAX:

node csdntopdf.js [-help] <[-input <string>] | [-url <string[]>]>

PARAMETERS:

    -help 

        Required?                   false
        Description                 Print command help information.

    -input <string> 

        Required?                   true
        Description                 Specify a filename which contains urls need to be exported.

    -url <string[]> 

        Required?                   true
        Description                 Specify one or more URLs which need to be exported, each URL will be separated by ','. 

OUTPUTS:
    Pdf file

REMARKS:
    -input and -url must specify at list one.

EXAMPLE:

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
            content: injectCss
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