# Export CSDN Article to PDF

## Steps to run

- Install nodejs 14.16.1 version or above
- Run below command to install the depenencies

```shell
npm install
```

- Run below command to get help information

``` shell
node csdntopdf.js -help

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

```
