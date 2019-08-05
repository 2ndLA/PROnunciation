# PROnunciation
![License-MIT](https://img.shields.io/github/license/itechub/PROnunciation.svg)
![Updated](https://img.shields.io/github/last-commit/itechub/pronunciation/master.svg?color=%23c16927&label=updated)

Correct pronunciation makes you sound more professional and causes less mishearing.

### Workflow

#### git clone project
```shell
git clone git@github.com:itechub/PROnunciation.git
```

#### Install dependencies
```shell
cd PROnunciation
yarn install
```

#### Run development server
```shell
mv .env_template .env
yarn start
```

#### Create a new branch to work on
```shell
# adding new words
git checkout -b words/term001
# or developing new feature
git checkout -b feature/new-feature
# or bugfix
git checkout -b bugfix/fix-the-error
```

#### Work on your branch

#### Open a new pull request

#### Deploy
After pull request is merged, checkout to branch `master`, then run `yarn run deploy` if you have the push permission on `gh-pages` branch

#### Download audio automatically
```
cd ./helpers
# Put words you want to add into `helpers/NewWords.txt`, one word per line
# Use VPN to reach Google, then run
python WordHelper.py
```

### References
- [Awesome Pronunciation](https://guanpengchn.github.io/awesome-pronunciation/)
- [chinese-programmer-wrong-pronunciation](https://github.com/shimohq/chinese-programmer-wrong-pronunciation)
- [Deploying a React App* to GitHub Pages](https://github.com/gitname/react-gh-pages)
- [Google Translate](https://translate.google.cn/)
- [HowToPronounce](http://www.howtopronounce.cc/)
- [YouTube](YouTube.com)
- [有道 youdao](https://dict.youdao.com)
- [Wiktionary](https://en.wiktionary.org/wiki/ansible)