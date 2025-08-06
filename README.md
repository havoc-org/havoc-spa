# Havoc-SPA

**Havoc-SPA** is a frontend Single Page Application (SPA) built using React and CSS, designed for performance, scalability, and modern web development.  
This project was created as part of an Engineer Thesis at PJAIT (Polish-Japanese Academy of Information Technology).

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About

Havoc-SPA is the main web interface for interacting with Havoc services - mainly Havoc API.  
It demonstrates best practices in SPA development available for the team during the active development phase and is intended as both a technical showcase and a practical tool for comfortable project management. Our final goal was to create something that could potentionally grow into a substitute of apps like Trello, Asana and Jira.

## Features

- ⚡ **SPA Architecture**: Smooth navigation without full page reloads.
- 🎨 **Responsive UI**: Works on both mobile and desktop devices.
- 🔐 **Authentication-ready**: Structure for easy integration with auth providers.
- 📦 **API Integration**: Facilitates communication with backend services.
- 🧑‍💻 **Developer Friendly**: Modular code and clear structure for maintainability.

## Tech Stack
- **JavaScript** (75.8%)
- **CSS** (22.7%)
- **Dockerfile** (1.3%)
- **HTML** (0.2%)

Our main provider of steep learning curves and suffering was loved and hated React.JS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for containerized runs)

### Installation

Clone the repository:

```bash
git clone https://github.com/havoc-org/havoc-spa.git
cd havoc-spa
npm install
# or
yarn install
```

### Running Locally

```bash
npm start
# or
yarn start
```

Open your browser at [http://localhost:3000](http://localhost:3000).

### Running with Docker

```bash
docker build -t havoc-spa .
docker run -p 3000:3000 havoc-spa
```

## Project Structure

```
havoc-spa/
├── public/           # Static assets
├── src/              # Application source code
│   ├── assets/       # Images and fonts
│   ├── components/   # Reusable components
│   ├── pages/        # Page-level components
│   ├── styles/       # CSS styles
│   ├── api/          # API logic
│   └── App.js        # Main app entry
├── Dockerfile        # Containerization setup
├── package.json
└── README.md
```

## Contributing

You can fork this repo, however this one is going to be "archived" to preserve state of out work.

## License

This project is licensed under the [MIT License](LICENSE).

## Maintainers

- [Havoc Org](https://github.com/havoc-org)
- Created as part of Engineer Thesis at [Polish-Japanese Academy of Information Technology](https://pja.edu.pl/en/)
---

*Built with ❤️ as part of an Engineer Thesis at PJAIT.*
