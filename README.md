# React Base Template

This template provides a solid foundation for modern React applications with industry-standard tooling and best practices built-in.

### 🚀 Features

- ⚡ **Vite** - Lightning fast build tool with HMR
- ⚛️ **React 19** - Latest React with concurrent features
- 🔧 **TypeScript** - Full type safety and modern JS features
- 🎨 **Tailwind CSS v4** - Utility-first CSS with the new CSS-based configuration
- 🧪 **Jest + Testing Library** - Comprehensive testing setup
- 📏 **ESLint + Prettier** - Code linting and formatting
- 🐺 **Husky + lint-staged** - Pre-commit hooks for code quality
- 📦 **SWC** - Fast TypeScript/JSX compilation
- 🔍 **Dependency Management** - Built-in dependency checking and updates

### Prerequisites

- Node.js 18+ and pnpm (recommended)

### 🔄 Template Usage

To use this as a template for new projects:

1. **Use GitHub template feature** or clone this repository
2. **Install dependencies** running `pnpm install --frozen-lockfile` (to avoid issues with diff libs version)
3. **Update package.json** with your project details:
   - Change `name` field
   - Update `version`
   - Modify `description`
4. **Update README.md** with project-specific information
5. **Configure environment variables** as needed
6. **Start running your application!** - `pnpm dev` -> Navigate to `http://localhost:5173`
7. **Happy coding**

## 📜 Available Scripts

### Development

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with automatic fixes
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint:all:fix` - Run type-check, lint, and format together

### Testing

- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage reports

### Dependencies

- `pnpm deps:check` - Check for unused dependencies
- `pnpm deps:update` - Update dependencies to latest versions

### Git Hooks

- `pnpm prepare` - Set up Husky git hooks

## 🔄 Continuous Integration (CI)

The template includes a **GitHub Actions workflow** that automatically runs code quality checks and tests on every pull request and push to main.

### 📋 What the CI Pipeline Does

The CI workflow (`.github/workflows/ci.yml`) automatically:

1. **📦 Dependencies** - Installs dependencies with pnpm (cached for speed)
2. **🔍 Type Check** - Runs TypeScript compiler (`pnpm run type-check`)
3. **📏 Linting** - Checks code quality with ESLint (`pnpm run lint`)
4. **✨ Formatting** - Validates code formatting with Prettier (`pnpm run format:check`)
5. **🧪 Testing** - Runs Jest tests with coverage (`pnpm test:coverage`)
6. **🏗️ Build** - Ensures production build succeeds (`pnpm run build`)

### 🔒 Branch Protection (Recommended)

For production repositories, enable branch protection rules:

1. Go to **Repository Settings > Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass (`ci` job)
   - ✅ Require branches to be up to date

This ensures **no code reaches main** without passing all quality checks!

### Path Aliases

The template includes `@/*` alias pointing to `src/*`. Add more aliases in:

- `tsconfig.app.json` (TypeScript)
- `vite.config.mjs` (Vite bundler)
- `jest.config.ts` (Jest testing)

### Environment Variables

Create `.env` files for environment-specific configuration:

```env
VITE_APP_TITLE=My React App
VITE_API_URL=http://localhost:3001
```

## 🔧 IDE Setup

### VS Code Extensions (Recommended)

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class suggestions
- **TypeScript Importer** - Auto import TypeScript modules
- **Jest** - Test runner integration

### Settings

The template works out-of-the-box with VS Code. Consider adding these settings:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

[here you can explore more about my VSCode settings & extensions](https://gist.github.com/thiagoskbnsk/1d6027b1ba4fe26f33fd1e039ec7085b)

## 🤝 Contributing

This is a personal template, but feel free to:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Ensure all tests pass and code is properly formatted
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).
