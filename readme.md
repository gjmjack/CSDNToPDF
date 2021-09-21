# Export [CSDN](https://blog.csdn.net/gjmjack/) article purely to PDF with Puppeteer

This is a node base javascript tool, which is used to quick export [CSDN](https://blog.csdn.net/gjmjack/) articles in pure mode (no ads, no recommendations). And it's build on [Puppeteer](http://www.puppeteerjs.com/) library.

This is currently build for [CSDN](https://blog.csdn.net/gjmjack/) articles. However you can change the [inject.css](inject.css) and make it available for any other site as well. Or even you can change the [csdntopdf.js](./csdntopdf.js) to make it automaticaly adjust for any site.

## Version history

- 1.0.0 Init add

## Quick start

- Install [nodejs](https://nodejs.org/en/) [14.16.1](https://nodejs.org/dist/v14.17.6/node-v14.17.6-x64.msi) or above
- Run below command to install the depenencies

```powershell
npm install
```

- Run below command to export [CSDN](https://blog.csdn.net/gjmjack/) artitle to PDF (it's just a sample)

```powershell
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321
```

- Advanced usage please run below command

``` shell
node csdntopdf.js -help

```

> SYNTAX:
>
> node csdntopdf.js [-help] <[-input <string>] | [-url <string[]>]>
>
> PARAMETERS:
>     -help
>
>         Required?                   false
>         Description                 Print command help information.
> 
>     -input <string> 
> 
>         Required?                   true
>         Description                 Specify a filename which contains urls need > to be exported.
> 
>     -url <string[]> 
> 
>         Required?                   true
>         Description                 Specify one or more URLs which need to be exported, each URL will be separated by ','. 
>
> OUTPUTS:
>     Pdf file
>
> REMARKS:
>     -input and -url must specify at list one.
>
> EXAMPLE:
>
> node csdntopdf.js # this will print the help information as well
> node csdntopdf.js -help # this will print the help information
> node csdntopdf.js -input D:\urls.txt # use a input file to provide urls
> node csdntopdf.js -url <https://blog.csdn.net/gjmjack/article/details/120338321> 

## use inline command to export pages

### Get help

```powershell
node csdntopdf.js -help 

# or

node csdntopdf.js
```

### Export articles with inline command

```shell

# SYNTAX:
# node csdntopdf.js -url <string[]>
# EXAMPLE:
node csdntopdf.js -url https://blog.csdn.net/gjmjack/article/details/120338321,https://blog.csdn.net/gjmjack/article/details/118695137

```

### Export articles use a file as input

- Clear the content of input_sample.txt and add URLs into input_sample.txt
- Run the command as blow

```powershell
node csdntopdf.js -input input_sample.txt
```

## Change the inject.css to as you wanted

inject.css is used to control the output PDF style, which has hidden the unnessary element on the page and output a pure article in PDF format.

```css

@media print {
    @page {
        size: A4;
        margin: 0;
    }

    /* hide the unnessary elements */
    .recommend-box.insert-baidu-box,
    div.comment-box,
    .second-recommend-box.recommend-box,
    .first-recommend-box.recommend-box,
    div.blog-footer-bottom,
    #toolBarBox,
    div.csdn-side-toolbar,
    aside.blog_container_aside,
    #csdn-toolbar {
        display: none !important;
    }

    /* Adjust the page size */
    .nodata .container main {
        width: 90% !important;
    }

    /* make the content in the page center */
    .nodata .container {
        width: 100% !important;
        display: flex;
        justify-content: center;
        padding: 0;
    }
}
```

# That's it and thanks for using this tool
