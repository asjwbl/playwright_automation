# Playwright Automation Framework for [AutomationExercise](https://automationexercise.com/)

This project is an automation testing framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/). It automates all test cases on the website [AutomationExercise](https://automationexercise.com/).

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This framework automates the testing of all functionalities on the [AutomationExercise](https://automationexercise.com/) website. The goal is to ensure that all website features work as expected by simulating user interactions and validating outputs. The test suite covers various scenarios such as user authentication, product searching, adding products to the cart, and other UI flows.

The framework leverages **Playwright** for browser automation and **TypeScript** for type-safe scripting, making it efficient and scalable.

## Prerequisites

Before setting up the project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/automation-exercise-playwright.git
   cd automation-exercise-playwright
   ```

2. **Install dependencies**:
   Using npm:

   ```bash
   npm install
   ```

   Or, using Yarn:

   ```bash
   yarn install
   ```

3. **Install Playwright browsers**:
   Playwright needs to download browser binaries for Chromium, Firefox, and WebKit:
   ```bash
   npx playwright install
   ```

## Running Tests

### Running All Tests

To run the entire suite of tests, use the following command:

```bash
npx playwright test
```

### Running a Specific Test

To run a single test or a specific test file:

```bash
npx playwright test tests/your-test-file.spec.ts
```

### Running Tests with Headed Mode

To run tests in headed mode (with a visible browser):

```bash
npx playwright test --headed
```

### Generating a Report

After running tests, you can generate and view a Playwright HTML report:

```bash
npx playwright show-report
```

### Debugging Tests

You can use the following command to debug tests:

```bash
npx playwright test --debug
```

## Project Structure

```bash
├── tests/                # Test files for different features
├── utils/                # Utility functions, helpers, and reusable code
├── playwright.config.ts  # Playwright configuration settings
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

- **tests/**: Contains all test scripts for the automation framework. Each test file covers different functionality of the website.
- **utils/**: Contains reusable utility functions like data handling, API calls, or custom helper functions.
- **playwright.config.ts**: This is the Playwright configuration file where you can customize test runs, browser configurations, timeouts, and more.

## Configuration

You can modify the `playwright.config.ts` file to customize the settings of the Playwright test runs. Key configuration options include:

- **Browsers**: You can set the browsers that Playwright will use (Chromium, Firefox, WebKit).
- **Headless Mode**: Whether to run tests in headless mode or not.
- **Timeouts**: You can adjust the test timeouts and other execution settings.

For more details on Playwright configuration, refer to the [Playwright documentation](https://playwright.dev/docs/test-configuration).

## Contributing

Contributions are welcome! If you have any improvements or new test cases you'd like to add, feel free to create a pull request.

1. Fork the repository.
2. Create a feature branch: `git checkout -b your-feature-branch`.
3. Commit your changes: `git commit -m "Add new feature or fix"`.
4. Push the branch: `git push origin your-feature-branch`.
5. Open a pull request.

Please make sure your code follows the existing coding style and includes appropriate test coverage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
