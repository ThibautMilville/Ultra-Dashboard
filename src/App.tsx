import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import Blockchain from './pages/Blockchain';
import Tokenomics from './pages/Tokenomics';
import Analytics from './pages/Analytics';

function App() {
  const [currentPage, setCurrentPage] = useState<'overview' | 'blockchain' | 'tokenomics' | 'analytics'>('overview');

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/blockchain') setCurrentPage('blockchain');
    else if (path === '/tokenomics') setCurrentPage('tokenomics');
    else if (path === '/analytics') setCurrentPage('analytics');
    else setCurrentPage('overview');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {currentPage === 'blockchain' ? <Blockchain /> :
       currentPage === 'tokenomics' ? <Tokenomics /> :
       currentPage === 'analytics' ? <Analytics /> :
       <Overview />}
      <Footer />
    </div>
  );
}

export default App;