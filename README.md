# Description

The aim of Word Bash is to use all the letters to make as few words as possible!

You can only use each letter once and give the same answer once. Words you have written will appear below the answer input area. You can click on these words to remove them and return their letters to be reused.

Answers appear with different colours based on how long the word is. Longer answers mean fewer words used which means a better score!

# React, TypeScript, Webpack, Mobx, SASS Template

A simple template for your projects; includes react, typescript, webpack, mobx, sass and a custom module declaration for creating react components from SVGs.

### 3...

Install the thing:

```
npm install
```

#### 2...

Run the thing:

```
npm run dev
```

#### 1...

Build the thing:

```
npm run build
```

#### GO!

Show the world, with github pages! See the full instructions for setup here: https://github.com/gitname/react-gh-pages

The gist is:

```
npm install gh-pages --save-dev
```

In package.json, add a 'homepage' property with the url to your project:

```
//...
"homepage": "http://username.github.io/repo-name"
```

Still in package.json, under the 'scripts' section, add a couple more scripts:

```
"scripts": {
  //...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Finally, when you want to deploy just run:

```
npm run deploy
```
