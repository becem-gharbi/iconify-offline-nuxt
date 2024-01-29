# Iconify Offline on Nuxt

This repo proposes a solution to load Iconify icons offline on Nuxt3. 

The advantages are:
- ✔️  On server side no need for network calls thus better loading time.
- ✔️  On client side no need to rely on Iconify API thus better security.
- ✔️  Takes benefit from Iconify client & server side caching (localStorage & memory).
- ✔️  Build offline applications.

At build a Vite [plugin](https://github.com/becem-gharbi/iconify-offline-nuxt/blob/main/iconfiy-offline.ts) scans the code and extracts all valid icon names. Then these icons are downloaded and saved locally on `/public/iconify` folder. 

At runtime (production) the icons are fetched via a custom [fetch](https://github.com/becem-gharbi/iconify-offline-nuxt/blob/main/plugins/iconify.ts) handler.
- On server side icons are directly imported. 
- On client side icons are served as static assets.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
