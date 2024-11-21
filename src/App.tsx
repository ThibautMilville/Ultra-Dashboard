import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import Blockchain from './pages/Blockchain';
import Tokenomics from './pages/Tokenomics';
import Analytics from './pages/Analytics';
import News from './pages/News';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'overview' | 'blockchain' | 'tokenomics' | 'analytics' | 'news'>('overview');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/blockchain') setCurrentPage('blockchain');
    else if (path === '/tokenomics') setCurrentPage('tokenomics');
    else if (path === '/analytics') setCurrentPage('analytics');
    else if (path === '/news') setCurrentPage('news');
    else setCurrentPage('overview');
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {currentPage === 'blockchain' ? <Blockchain /> :
         currentPage === 'tokenomics' ? <Tokenomics /> :
         currentPage === 'analytics' ? <Analytics /> :
         currentPage === 'news' ? <News /> :
         <Overview />}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;