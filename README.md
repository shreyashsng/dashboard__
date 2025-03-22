# Modern Next.js Dashboard

A modern, responsive dashboard application built with Next.js 14, featuring a dark/light theme, responsive design, and a clean user interface.

![Dashboard Preview](preview.png)

## Features

- 🎨 Modern and Clean UI
- 🌓 Dark/Light Theme Toggle
- 📱 Fully Responsive Design
- 🔍 Search Functionality
- 📊 Data Table with Pagination
- 🎯 Real-time Data Updates
- 🔐 Authentication Ready

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Geist Font](https://vercel.com/font)
- [Lucide Icons](https://lucide.dev/)

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-dashboard.git
cd nextjs-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx    # Dashboard layout with sidebar
│   │   └── page.tsx      # Main dashboard page
│   ├── login/
│   │   └── page.tsx      # Login page
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Root redirect
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx   # Navigation sidebar
│   │   └── posts-table.tsx # Data table component
│   ├── ui/              # Shadcn UI components
│   └── theme-provider.tsx
└── lib/
    └── utils.ts         # Utility functions
```

## Key Features

### Authentication
- Simple login system
- Protected dashboard routes
- Token-based authentication

### Dashboard
- Clean and modern interface
- Real-time data updates
- Responsive data tables
- Search and filter functionality
- Pagination system

### Theme System
- Toggle between light and dark modes
- Persistent theme preference
- System theme detection
- Smooth theme transitions

### Mobile Responsiveness
- Adaptive sidebar navigation
- Mobile-optimized tables
- Touch-friendly interface
- Responsive typography

## Configuration

### Theme Customization

The theme colors can be customized in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* Add your custom colors here */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* Add your dark theme colors here */
}
```

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

