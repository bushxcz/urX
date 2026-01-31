# urX - Revenue Traceability for X Creators

A premium dashboard for X (Twitter) creators to track monetization stats, analyze revenue efficiency, and visualize growth patterns.

![urX Dashboard](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## ✨ Features

- **Revenue Tracking** - Manually enter impressions, CPM, engagement, and payout data
- **Monetization Analyzer** - Visualize effective CPM, revenue per 1M impressions, and growth trends
- **Interactive Charts** - Built with Recharts for beautiful data visualization
- **Smooth Animations** - Framer Motion powered entry animations and interactions
- **Premium Design** - "Oravia" minimal enterprise aesthetic with glassmorphism and technical grid

## 🛠️ Tech Stack

- **React 19** + Vite
- **Tailwind CSS v4**
- **Framer Motion** - Animations
- **Recharts** - Charts
- **Lucide React** - Icons

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── TechnicalGrid.jsx    # Background grid pattern
│   ├── ShimmerButton.jsx    # Animated CTA button
│   ├── PremiumCard.jsx      # Elevated card component
│   ├── Navbar.jsx           # Glassmorphism navbar
│   └── RevenueGraph.jsx     # SVG revenue visualization
├── sections/
│   ├── Hero.jsx             # Landing hero section
│   ├── Tracker.jsx          # Stats input form
│   └── Dashboard.jsx        # Analytics dashboard
└── App.jsx                  # Main app component
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Obsidian | `#111111` |
| Canvas | `#FAFAFA` |
| Emerald Accent | `#10B981` |
| Fonts | Plus Jakarta Sans, Inter, JetBrains Mono |

## 📄 License

MIT
