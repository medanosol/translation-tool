<div align="center"><img src="https://github.com/medanosol/translation-tool/assets/71669730/fa23f864-de8f-4de1-8c93-1d341b87078e" alt="translation-tool cover"/></div>

<div align="center"><strong>@medanosol/translation-tool</strong></div>
<div align="center">The easiest way to translate your i18n files<br /></div>
<br />
<div align="center">
<a href="https://medanosol.github.io/translation-tool.html">Website</a> 
<span> · </span>
<a href="https://github.com/medanosol/translation-tool">GitHub</a> 
</div>

## Introduction

translation-tool allows you to translate your i18n files in a simple and fast way. You can manually translate the files or use the Deepl API to translate them automatically.

## Why

The idea of this tool is to facilitate the translation of i18n files, since it is a tedious task to do it manually. As devs, we are always looking for ways to automate tasks and this is one of them.

## Features

- Translate your i18n files manually or automatically using the Deepl API.
- Translate all your keys at once or translate them one by one.
- Upload partially translated files and the tool will automatically detect the translated keys and will not translate them again.

## Install

Install the package using your favorite package manager.

#### With yarn

```sh
yarn add @medanosol/translation-tool --dev
```

#### With npm

```sh
npm install @medanosol/translation-tool -D
```

## Getting started

Once you have installed the package, add the following command to your package.json file.

```json
"scripts": {
  "translate": "translation-tool"
}
```

Then, when you run the command `yarn translate` or `npm run translate`, the tool will start at port 3000 by default. You can change the port by adding the following command to your package.json file.

```json
"scripts": {
  "translate": "translation-tool --port 3001"
}
```

## How to use

You just need to add the API key before you start trasnlating your files. If you want to skip doing this every time you open the tool, we added a way to save your API key in the browser's local storage. To do this, just click on the "Save API Key" button and the next time you open the tool, it will automatically load your API key. It's encrypted, so don't worry about security. If you still don't feel safe, you can always delete it from the local storage and add it manually every time you open the tool.

![demo-image](https://github.com/medanosol/translation-tool/assets/47543076/9526b559-0146-4e75-8d45-9b05537eaad6)

### Setting up the Deepl API

To use the Deepl API, you need to create an account on their website and get an API key. You can create an account here: [Deepl API](https://www.deepl.com/pro.html?cta=header-prices/). Their free plan allows you to translate 500,000 characters per month, so for most projects it will be more than enough.

### Adding your i18n files

Initially you will be asqued to set the origin language of your file. After you do that, you will be able to upload your i18n file.

<div align="center"><img src="https://github.com/medanosol/translation-tool/assets/47543076/3b6994a0-9903-442a-9113-11d0cd2b8e76" width="100%" alt="adding files"/></div>

### Translating your files

If you have set up the Deepl API, you can translate your files automatically. If you haven't, you can translate them manually. To do this, just click on the "Translate all" button and the tool will start translating your file. If you want to translate a specific key, you can do it by clicking on the button next to the key.

### Uploading partially translated files

In case you have already translated some of your files, you can upload them to the tool and it will automatically detect the translated keys and will not translate them again. Remember that you have to set which is the desired language of the file before translating it.

### Downloading your files

Once you have translated your files, you can download them by clicking on the "Save file" button. The tool will automatically download a json file with all your translations.

You can also copy the json file to your clipboard by clicking on the "Copy to clipboard" button.

## Supported languages

Manually, you can translate your i18n files to any language you want. But if you want to use the Deepl API, you can only translate languages listed on the Deepl API Documentation: [Deepl API Docs](https://www.deepl.com/docs-api/translate-text/translate-text/)

## License

MIT License
