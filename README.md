# PRIMAKARA APPS

## Getting Started

### Create Project

Create react native apps with exact version to ensure you have the same version within this guide.

```
react-native init YourAppsName --version 0.61.2
```

### Add Material UI Components

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

### Add Navigation

Install navigation using `react-navigation`.

```
yarn add react-navigation react-native-reanimated react-native-gesture-handler react-native-screens@^1.0.0-alpha.23
```

To finalize installation of `react-native-screens`, add the following lines below (implementation) to `dependencies` section in `android/app/build.gradle`. And make sure to have same indentation.

```gradle
dependencies {
  ...
  implementation 'androidx.appcompat:appcompat:1.1.0-rc01' // Add this line
  implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02' // Add this line
  ...
}
```

To finalize installation of `react-native-gesture-handler` for Android, make the following modifications to `MainActivity.java` (Wihout plus sign).

```java
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

On the new version of `React Navigation`, the stack navigation is on different package. To install, follow the step below.

```
yarn add react-navigation-stack
```
