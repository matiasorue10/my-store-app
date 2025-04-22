# 🧑‍💻 My store App

A React Native mobile app built with Expo, designed to showcase my skills in mobile development. This project includes user authentication, product listing, and detailed product views — demonstrating clean code practices, and modern tooling.

## ✨ Features

- 🔐 Login: Secure and user-friendly authentication flow.

- 🛍️ Product List: Fetch and display a list of products with responsive design.

- 📦 Product Details: Detailed view for individual products.

- ⚙️ State Management: Powered by Redux Toolkit for scalable global state.

- 🧭 Navigation: Smooth navigation using React Navigation.

- 🎨 Styling: Fast and consistent UI using NativeWind (Tailwind CSS for React Native).

- ✅ Testing: Unit and component testing with Jest and React Native Testing Library.

- 🧼 Code Quality:

  - ESLint + Prettier for linting and formatting.

  - Commit Linting with Conventional Commits.

  - Husky for Git hooks (pre-commit & commit-msg).

## 🛠️ Tech Stack

- [React Native with Expo](https://reactnative.dev/docs/environment-setup#start-a-new-react-native-project-with-expo)

- [Redux Toolkit](https://redux-toolkit.js.org/)

- [React Navigation](https://reactnavigation.org/)

- [NativeWind](https://www.nativewind.dev/)

- [Jest](https://jestjs.io/docs/tutorial-react-native) & [React Native Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)

- [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/).

## 📦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)

- Expo CLI (npm install -g expo-cli)

- Git

### Installation

```bash
git clone https://github.com/matiasorue10/my-store-app.git
cd my-store-app
npm install
```

### Running the App

```bash
npm run start
```

Scan the QR code using your Expo Go app or run it on a simulator.

## 🧪 Running Tests

```bash
npm test
```

## 🧹 Linting & Formatting

### Lint

```bash
npm run lint
```

### Format

```bash
npm run prettier
```

## ✅ Commit Standards

This project uses Conventional Commits. Make sure your commit messages follow the proper format (e.g. feat: add login screen, fix: resolve crash on load).

### Husky Hooks

- `pre-commit`: runs linting and formatting checks

- `commit-msg`: validates commit messages

- `pre-push`: run all tests before push

## 📁 Folder Structure

```bash
/.husky
/.github
/assets
/src
   /api --> // Base API Config
   /app --> // Global App configuration, such as the redux store, navigation and hooks
   /components --> // Reutilizable components
   /features
      /foo-feature --> Includes, the screens, services types and test. Also you can find sub-features here.
```

## 🚀 Purpose

This project serves as a personal portfolio piece to demonstrate:

- Scalable app structure

- Clean code and architecture

- Integration of modern libraries and tools

- Commitment to testing and developer workflow

## 📬 Contact

Feel free to reach out for feedback or collaboration!

**Matias Orue C.**

[LinkedIn](https://www.linkedin.com/in/matias-orue10/) | [Email](mailto:matiasorue@hotmail.com)
