# Export CSDN article to PDF

This is a node base javascript tool, which used to quick export CSDN articles in pure mode (no ads, no recommendations). And it's build on [Puppeteer](http://www.puppeteerjs.com/) library.

## Quick start

- Install nodejs 14.16.1 version or above
- Run below command to install the depenencies

```powershell
npm install
```
- Run below command to export CSDN artitle to PDF (it's just a sample)

```powershell
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321
```

- Advanced usage please run below command

``` powershell
node csdntopdf.js -help

Usage:

node csdntopdf.js [-help] <[-input <file path>]|[-url <[url 1] [,url 2] ... [,url n]>]>

-help : Print command help information.
-input <file path> : Specify a filename which contains urls need to be exported.
-url <[url 1] [,url 2]...[,url n]>] : Specify one or more URLs which need to be exported, each URL will be separated by ','. 

Examples:

node csdntopdf.js # this will print the help information as well
node csdntopdf.js -help # this will print the help information
node csdntopdf.js -input D:\urls.txt # use a input file to provide urls
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321 # use inline command to export pages

```

## Get help

```powershell
node csdntopdf.js -help 

# or

node csdntopdf.js
```

## Export articles with inline command

```powershell
node csdntopdf.js -url <[url 1] [,url 2] ... [,url n]>]>

# For example：

node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321,https://blog.csdn.net/gjmjack/article/details/118695137

```

## Export articles use a file as input

- Clear the content of input_sample.txt and add URLs into input_sample.txt
- Run the command as blow

```powershell
node csdntopdf.js -input input_sample.txt
```

## That's it enjoy that ^_^
