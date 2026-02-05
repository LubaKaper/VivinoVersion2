# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Vivino Mobile UI Replica

  Mobile-first UI replica of Vivino (Shop list, Wine Detail with slide-up sheet, Taste Profile Edit) built with React + Vite + TypeScript + Tailwind CSS v3.3.x.

  ## Scripts

  - `npm run dev` — start dev server
  - `npm run build` — production build
  - `npm run preview` — preview build

  ## Project highlights

  - Tailwind v3.3.x with classic PostCSS setup
  - React Router routes: `/shop`, `/wine/:id`, `/taste-profile/edit`
  - Design system: `src/styles/designSystem.ts`
  - Mock data: `src/data/wines.ts`
  - Mobile-first layout (375px baseline)
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
