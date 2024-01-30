# Changelog


## v0.1.2

[compare changes](https://github.com/becem-gharbi/iconify-offline-nuxt/compare/v0.1.1...v0.1.2)

### 🔥 Performance

- Download icons with a single network request ([62d1365](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/62d1365))
- Avoid writing an existant file ([859702d](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/859702d))
- Clear icons set after client build end ([06d5bea](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/06d5bea))

### 🩹 Fixes

- Return default property on import ([cc1ec10](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/cc1ec10))
- Create icons directory once ([e38c183](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/e38c183))

### 💅 Refactors

- Extract utilties from vite plugin ([3f52929](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/3f52929))
- Avoid dynamic import with variables ([35f95a7](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/35f95a7))

### 🏡 Chore

- Add client-only icons ([217e817](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/217e817))
- Add server-only icons ([a2c2530](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/a2c2530))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

## v0.1.1


### 🚀 Enhancements

- Implement icon names extraction ([f7ca8ef](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/f7ca8ef))
- Implement icons download on build termination ([b4cf99c](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/b4cf99c))

### 🔥 Performance

- Fetch icons via loadIcon for internal caching ([b349bce](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/b349bce))
- Directly import icons on server-side instead of fetch ([99cd671](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/99cd671))
- Load collections info from @iconify/json instead of fetch ([73b2525](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/73b2525))

### 🩹 Fixes

- Avoid local fetch on pre-rendering ([6446f48](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/6446f48))
- Follow iconify json structure on save ([b0b459c](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/b0b459c))
- Skip running the rollup plugin in development ([007bc33](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/007bc33))
- Fix fetch of multiple icons with the same collection ([6c20e70](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/6c20e70))

### 💅 Refactors

- Define a Vite plugin instead of Rollup ([b91bb19](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/b91bb19))
- Add rootDir argument in vite plugin ([3b39724](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/3b39724))

### 📖 Documentation

- Update README ([4097793](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/4097793))
- Update README ([0362d0a](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/0362d0a))
- Update README ([519cbbd](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/519cbbd))
- Update README ([1148600](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/1148600))

### 🏡 Chore

- Create basic Iconify component ([40fd030](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/40fd030))
- Add json extension ([822d7d1](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/822d7d1))
- Update gitignore ([490a14b](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/490a14b))
- Rename nuxt plugin ([5cdb5a0](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/5cdb5a0))
- Add log messages ([230700c](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/230700c))
- Add a static prerendered page ([2eec848](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/2eec848))
- Update package.json ([3b28622](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/3b28622))
- Setup release ([7bde629](https://github.com/becem-gharbi/iconify-offline-nuxt/commit/7bde629))

### ❤️ Contributors

- Becem-gharbi <becem.gharbi@live.com>

