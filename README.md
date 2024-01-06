# Note-Taker

[@Wes-Coburn](https://github.com/Wes-Coburn)

---

## Description

-> Lightweight note taking app. A full-stack MERN app with TypeScript and TailwindCSS.

-> Implementation of my [MERN Template](https://github.com/Wes-Coburn/template-MERN-app).

## Technologies

- Node
- TypeScript
- React
- Redux
- React-Router
- TailwindCSS
- Vite
- Vitest
- React Testing Library
- [React-Helmet](https://www.npmjs.com/package/react-helmet)
- [React-Awesome-Reveal](https://www.npmjs.com/package/react-awesome-reveal)

## Development

### TODO!

- Create 'server/config.env' with ['config.sample-env'](server/config.sample-env) structure.
  - Alternatively, configure *secrets* in your deployment.
- Update [manifest.json](/client/manifest.json)
- Update [appInfo.json](/client//appInfo.json)
- Update [sitemap.xml](/client/public/sitemap.xml)
- Update [robots.txt](/client/public/robots.txt)
- Remove [responsive.ts](/client/src/app/responsive.ts) unless mobile subdomain is configured ('m.')

## Scripts

```shell
## INSTALL
# install all packages
npm run install-all
# [NOT RECOMMENDED] install and update all packages (uses npm-check-updates)
npm run install-update

## START
# spin up a local server on port 5050
npm run start:server
# start the client
npm run start:client

## TEST
# run all tests (uses Vitest and React Testing Library)
npm test

## FORMAT
# format all directories (uses ESLint, Prettier, and eslint-plugin-prettier)
npm run format
npm run format:fix # apply changes (uses 'eslint --fix' and 'prettier --write')
```
