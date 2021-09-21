# Export CSDN article to PDF

This is a node base javascript tool, which used to quick export CSDN articles in pure mode (no ads, no recommendations). And it's build on [Puppeteer](http://www.puppeteerjs.com/) library.

## Quick start

- Install [nodejs](https://nodejs.org/en/) [14.16.1](https://nodejs.org/dist/v14.17.6/node-v14.17.6-x64.msi) or above
- Run below command to install the depenencies

```powershell
npm install
```

- Run below command to export CSDN artitle to PDF (it's just a sample)

```powershell
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321
```

- Advanced usage please run below command

``` shell
node csdntopdf.js -help

```

```shell
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

```shell

SYNTAX:
node csdntopdf.js -url <string[]>

# For example：
EXAMPLE:
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321,https://blog.csdn.net/gjmjack/article/details/118695137

```

## Export articles use a file as input

- Clear the content of input_sample.txt and add URLs into input_sample.txt
- Run the command as blow

```powershell
node csdntopdf.js -input input_sample.txt
```

## That's it enjoy that ^_^
