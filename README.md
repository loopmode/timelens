# react-desktop-typescript

Electron app boilerplate for typescript react projects.

## Notes

- App icon for production build (installer, OS links) is `build/icon.ico` (electron-builder convention)
- App icon for the active window is in `static/images/app.ico` (same icon, in electron-webpack static folder)
- There is `src/renderer/utils/static` with a `getStatic` function. Use it to access static content
- Font aliases to static folder are in place, check `src/index.scss` for usage
- Check README in `static/fonts` for instructions on how to embed additional fonts

---

## electron-webpack-quick-start

> A bare minimum project structure to get started developing with [`electron-webpack`](https://github.com/electron-userland/electron-webpack).

Thanks to the power of `electron-webpack` this template comes packed with...

- Use of [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
- HMR for both `renderer` and `main` processes
- Use of [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
- Use of [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

Make sure to check out [`electron-webpack`'s documentation](https://webpack.electron.build/) for more details.

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```
