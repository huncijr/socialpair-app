# SocialPair

A modern web application for comparing social media platforms side-by-side. Explore user statistics, fame potential, pros and cons, and find the best platform for your goals.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)

---

## What is SocialPair?

Social media platforms each have their own strengths, audiences, and potential for growth. **SocialPair** helps you cut through the noise by giving you a clear, data-driven comparison of the world's biggest social networks.

### Key Features

- **Platform Profiles** — Detailed pages for each platform with founding history, company info, and target demographics
- **Side-by-Side Comparison** — Pick any two platforms and compare metrics like monthly users, peak performance, and fame score
- **Usage Charts** — Interactive line charts showing monthly active user trends throughout the year
- **Pros & Cons** — Honest breakdown of the advantages and disadvantages of each platform
- **Fame Score** — A unique metric measuring how likely you are to "go famous" on each platform
- **Target Demographics** — Age groups and primary purpose for each social network

---

## Platforms Covered

| Platform | Founded | Monthly Users | Fame Score |
|----------|---------|---------------|------------|
| Facebook | 2004 | 3,050M | 75/100 |
| Instagram | 2010 | 2,000M | 90/100 |
| TikTok | 2016 | 1,500M | 95/100 |
| YouTube | 2005 | 2,700M | 85/100 |
| X (Twitter) | 2006 | 550M | 80/100 |
| LinkedIn | 2003 | 950M | 40/100 |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Vite](https://vitejs.dev/) + [React](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Routing | [React Router](https://reactrouter.com/) |

---

## Project Structure

```
src/
├── components/
│   ├── ComparisonTable.tsx    # Side-by-side comparison table
│   ├── Navbar.tsx             # Navigation bar
│   ├── PlatformCard.tsx       # Platform summary card
│   └── StatisticsChart.tsx    # Monthly usage line chart
├── data/
│   └── platforms.ts           # Platform data and statistics
├── pages/
│   ├── HomePage.tsx           # All platforms grid view
│   ├── PlatformDetailPage.tsx # Detailed single platform view
│   └── ComparePage.tsx        # Two-platform comparison view
├── types/
│   └── platform.ts            # TypeScript type definitions
├── App.tsx                    # Root component with routing
└── main.tsx                   # Application entry point
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/huncijr/socialpair-app.git
cd socialpair-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## How It Works

1. **Browse** — The home page shows all 6 platforms as cards with key stats at a glance
2. **Explore** — Click any card to see detailed information, pros/cons, and a usage chart
3. **Compare** — Use the Compare page to select two platforms and view a side-by-side breakdown with an interactive chart

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

MIT
