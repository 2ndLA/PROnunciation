# PROnunciation

![License-MIT](https://img.shields.io/github/license/kvko/PROnunciation.svg)
![Updated](https://img.shields.io/github/last-commit/kvko/pronunciation/main.svg?color=%23c16927&label=updated)

Correct pronunciation makes you sound more professional and causes less
misunderstanding.

- [PROnunciation](#pronunciation)
  - [Contributing](#contributing)
    - [Words Request](#words-request)
    - [Cloning this repository](#cloning-this-repository)
    - [Installing dependencies](#installing-dependencies)
    - [Running development server](#running-development-server)
    - [Creating a new branch to work on](#creating-a-new-branch-to-work-on)
    - [Working on your branch](#working-on-your-branch)
    - [Opening a pull request](#opening-a-pull-request)
    - [Downloading audio automatically [Optional]](#downloading-audio-automatically-optional)
  - [References](#references)

## Contributing

### Words Request

For any words that we haven't collected, please issue them in [issues](https://github.com/kvko/PROnunciation/issues).

Or to collect words by yourself, follow steps below:

### Cloning this repository

```sh
git clone git@github.com:kvko/PROnunciation.git
```

### Installing dependencies

```sh
cd PROnunciation
yarn install
```

### Running development server

```sh
cp .env_template .env
# edit .env
yarn start
```

### Creating a new branch to work on

```sh
# adding new words
git checkout -b words/term001
# or developing new feature
git checkout -b feature/new-feature
# or bugfix
git checkout -b bugfix/fix-the-error
```

### Working on your branch

```sh
# do something
```

### Opening a pull request

[GitHub Guides](https://guides.github.com/): [Making a Pull Request](https://guides.github.com/activities/forking/#making-a-pull-request)

### Downloading audio automatically [Optional]

```sh
cd ./helpers
# Put words you want to add into `helpers/NewWords.txt`, one word per line
# Use VPN to reach Google, then run
python WordHelper.py
```

## References

- [Awesome Pronunciation](https://guanpengchn.github.io/awesome-pronunciation/)
- [chinese-programmer-wrong-pronunciation](https://github.com/shimohq/chinese-programmer-wrong-pronunciation)
- [Deploying a React App* to GitHub Pages](https://github.com/gitname/react-gh-pages)
- [Google Translate](https://translate.google.cn/)
- [HowToPronounce](http://www.howtopronounce.cc/)
- [YouTube](YouTube.com)
- [有道 youdao](https://dict.youdao.com)
- [Wiktionary](https://en.wiktionary.org/wiki/ansible)
