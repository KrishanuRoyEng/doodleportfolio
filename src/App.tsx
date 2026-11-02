import React, { useState, useMemo, useEffect } from 'react';
import type { WorkItem, CommissionConfig, CommissionFormat } from './types';
import { portfolioWorks } from './data/works';
import { calculateCommissionPrice } from './utils/pricing';
import { TopBar } from './components/TopBar';
import { HeroSummary } from './components/HeroSummary';
import { WorksGrid } from './components/WorksGrid';
import { WorkDetailModal } from './components/WorkDetailModal';
import { CommissionConfigurator } from './components/CommissionConfigurator';
import { ReviewsList } from './components/ReviewsList';
import { RequestForm } from './components/RequestForm';
import { Footer } from './components/Footer';
import { Tick01Icon } from 'hugeicons-react';

export const App: React.FC = () => {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Dark Mode Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('akansha-theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('akansha-theme', theme);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const [commissionConfig, setCommissionConfig] = useState<CommissionConfig>({
    format: 'Original Artwork (A5)',
    subjectCount: 1,
    backgroundType: 'Clean Paper Wash',
    usageRights: 'Personal Keepsake',
    teakWoodFrame: false,
    giftWrappingNote: false,
    expressTrackedCourier: false
  });

  const priceBreakdown = useMemo(() => {
    return calculateCommissionPrice(commissionConfig);
  }, [commissionConfig]);

  const handleShowNotice = (msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => {
      setNoticeMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleNavigateTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFormatFromModal = (format: CommissionFormat) => {
    setCommissionConfig((prev) => ({ ...prev, format }));
    setSelectedWork(null);
    handleNavigateTo('commission');
    handleShowNotice(`Selected ${format} in commission calculator.`);
  };

  const handleTransferToForm = () => {
    handleNavigateTo('request');
    const input = document.getElementById('client-name');
    if (input) {
      setTimeout(() => input.focus(), 400);
    }
    handleShowNotice('Commission configuration loaded into request form.');
  };

  return (
    <div className="app-shell">
      <TopBar 
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onNavigateTo={handleNavigateTo} 
        onShowNotice={handleShowNotice} 
      />

      <main>
        <HeroSummary onNavigateTo={handleNavigateTo} />
        
        <WorksGrid 
          works={portfolioWorks} 
          onSelectWork={(work) => setSelectedWork(work)} 
        />

        <CommissionConfigurator
          config={commissionConfig}
          onChangeConfig={setCommissionConfig}
          priceBreakdown={priceBreakdown}
          onTransferToForm={handleTransferToForm}
        />

        <ReviewsList onNavigateToConfig={() => handleNavigateTo('commission')} />

        <RequestForm
          config={commissionConfig}
          priceBreakdown={priceBreakdown}
          onNavigateToConfig={() => handleNavigateTo('commission')}
          onShowNotice={handleShowNotice}
        />
      </main>

      <Footer 
        onNavigateTo={handleNavigateTo} 
        onShowNotice={handleShowNotice} 
      />

      {/* Detail Modal */}
      <WorkDetailModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onSelectFormat={handleSelectFormatFromModal}
      />

      {/* Global Notification Banner */}
      {noticeMessage && (
        <div className="notification-banner font-mono" role="status">
          <Tick01Icon size={16} />
          <span>{noticeMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
