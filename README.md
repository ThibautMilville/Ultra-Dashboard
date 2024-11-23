# Ultra Dashboard

A comprehensive analytics dashboard for tracking and analyzing the Ultra ($UOS) token performance, built with React, TypeScript, and Tailwind CSS.

![Ultra Dashboard](https://assets.coingecko.com/coins/images/4480/small/Ultra.png)

## Features

- **Real-time Price Tracking**: Live price updates for UOS token in USD and EUR
- **Technical Analysis**: RSI, MACD, and other key technical indicators
- **Interactive Charts**: Multi-timeframe price charts using Lightweight Charts
- **Blockchain Analytics**: Detailed blockchain metrics and network statistics
- **Tokenomics Overview**: Token distribution, supply metrics, and market data
- **News Feed**: Latest updates and announcements from the Ultra ecosystem
- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Multi-language Support**: Available in English and French

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lightweight Charts
- SWR for data fetching
- Zustand for state management
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ThibautMilville/ultra-dashboard.git
cd ultra-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your CoinGecko API key:
```
VITE_COINGECKO_API_KEY=your-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components (Header, Footer)
│   └── pages/           # Page-specific components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── i18n/               # Internationalization
├── pages/              # Main page components
└── store/              # Zustand store configurations
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## API Integration

The dashboard integrates with the following APIs:

- CoinGecko API for price and market data
- Ultra Blockchain API for network statistics
- News API for latest updates

## Features in Detail

### Price Tracking
- Real-time price updates
- Multiple timeframe options (1H, 4H, 1D, 1W, 1M, 1Y)
- USD/EUR currency switching
- Price change indicators

### Technical Analysis
- RSI (Relative Strength Index)
- MACD (Moving Average Convergence Divergence)
- Volume analysis
- Volatility metrics

### Blockchain Analytics
- Network statistics
- Block producer information
- Transaction metrics
- Network health indicators

### Tokenomics
- Supply distribution
- Market metrics
- Exchange listings
- Staking information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ultra.io for blockchain data
- CoinGecko for market data
- TradingView for Lightweight Charts library
- The Ultra community for feedback and support

## Support

For support, please open an issue in the GitHub repository or contact the development team.
