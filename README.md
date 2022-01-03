<h1 align="center">Welcome to normalize-url-plus 👋</h1>

[![CircleCI](https://circleci.com/gh/JaneJeon/normalize-url-plus/tree/master.svg?style=shield)](https://circleci.com/gh/JaneJeon/normalize-url-plus/tree/master)
[![codecov](https://codecov.io/gh/JaneJeon/normalize-url-plus/branch/master/graph/badge.svg)](https://codecov.io/gh/JaneJeon/normalize-url-plus)
[![Version](https://img.shields.io/npm/v/normalize-url-plus)](https://www.npmjs.com/package/normalize-url-plus)
[![Downloads](https://img.shields.io/npm/dt/normalize-url-plus)](https://www.npmjs.com/package/normalize-url-plus)

> normalize-url plus additional features to supercharge link normalization!

While `normalize-url` is good enough for many normalization use cases, this library is akin to prettier or black in that in making sure we get a perfect N:1 mapping of similar links to the "base" one, it goes far beyond just looking at the URL:

- default www-stripping and default https, which falls back if such links do not exist (by actually visiting them)
- stripping ALL trackers (courtesy of clearURLs)
- following redirects (even those that can't normally be automatically redirected without manual user intervention such as youtube redirect links, again courtesy of clearURLs)
- and even extracting canonical URLs from actually visiting the page

### 🏠 [Homepage](https://github.com/JaneJeon/normalize-url-plus)

## Install

```sh
npm i normalize-url-plus
```

## Usage

Note that this package is ESM-only; see https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c for what to do if you're using CJS (i.e. `require()`).

```js
import gen from 'normalize-url-plus'
const normalizeUrl = gen(normalizeUrlOptions, gotOptions) // it is recommended to fill out the caching options for got

const longDisgustingTrackerFilledLink =
  'https://www.amazon.com/Blanket-Fleece-Cartoon-Printing-Napping/dp/B089G4JDVB/ref=sr_1_1?keywords=hello%20kitty&sr=8-1' // eww
await normalizeUrl(longDisgustingTrackerFilledLink) // https://amazon.com/Blanket-Fleece-Cartoon-Printing-Napping/dp/B089G4JDVB
```

### Notes about Web Scraping

Because so much of URL normalization relies on actually visiting the page (remember, we have to actually see whether the URL loads or not to get redirects and figure out https vs. http and www vs. non-www), we need to make sure we can do so reliably - otherwise, link normalization will _fail_.

And web scraping techniques to sideline bot detection is _crucial_ for this - a lot of websites (and CDNs) nowadays block requests by bots directly to (try to) prevent web scraping. Although we are NOT web scraping the contents (in reality, we are only interested in 1. whether we can connect to a particular URL, and 2. the `<head>` elements to try to figure out the canonical URL), these softwares will block requests from this library all the same.

Furthermore, if you actually identify yourself as a bot, there is a real risk that a malicious web server could redirect the bot to a legitimate website, while redirecting real users to a malicious website (this actually happened with twitter's own bots) - therefore, even if it's not for "hiding" spammy requests or for any malicious purpose, we NEED to blend in with real users in order to get the correct response, so that the URL normalization would direct users to what they would actually go to had they clicked the non-normalized URL.

Luckily, because of our requirements (we don't really care about the body - which is what most websites try to hide by dynamically loading them or whatever to avoid showing the content to web scrapers), we don't need to be _fullproof_ about this - i.e. going heavyweight with puppeteer, fingerprint injection and a whole host of "web scraping stuff" that aims to actually load the `<body>` content.

For most purposes, using `got-scraping` will get you around most bot protection services, i.e. actually giving you a response, even if that response's body is empty. I've found that it works fine even in known server IPs; however, if you're seeing that your requests are being blocked, feel free to pass in a `got-scraping` instance with a residential IP proxy.

## Run tests

```sh
npm test
```

## Author

👤 **Jane Jeon <me@janejeon.dev>**

- Website: janejeon.dev
- Github: [@JaneJeon](https://github.com/JaneJeon)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/JaneJeon/normalize-url-plus/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Jane Jeon <me@janejeon.dev>](https://github.com/JaneJeon).<br />
This project is [LGPL-3.0](https://github.com/JaneJeon/normalize-url-plus/blob/main/LICENSE) licensed.
