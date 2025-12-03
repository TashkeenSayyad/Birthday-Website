# Birthday Website

A React + Vite birthday website project.

## Prerequisites

**Node.js Version:** This project requires Node.js **20.19.0+** or **22.12.0+**

### Checking Your Node.js Version
```bash
node --version
```

### Upgrading Node.js

If your Node.js version is too old, you can upgrade using one of these methods:

**Using NVM (Recommended):**
```bash
# Install/use the correct version
nvm install 20.19.0
nvm use 20.19.0
```

**Or download directly from:**
- [Node.js Official Website](https://nodejs.org/)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Troubleshooting

### Error: "crypto.hash is not a function"

This error occurs when using an outdated Node.js version. Vite requires Node.js 20.19+ or 22.12+. Please upgrade your Node.js version using the instructions above.
