# PRIMAKARA APPS

## Getting Started

### Setup Project

Create react native apps with exact version to ensure you have the same version within this guide.

```
react-native init YourAppsName --version 0.61.2
```

Install Material UI component to create interface easier using React Native Paper.

```
yarn add react-native-paper
```

You also need to install icons.

```
yarn add react-native-vector-icons
```

(Optional) To get smaller bundle size by excluding Material UI components you don't use. Add `react-native-paper/babel` to the `plugins` section in your `babel.config.js`. It should look like this:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
```
