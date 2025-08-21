import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ArticleHeader } from './components/ArticleHeader';
import { ArticleContent } from './components/ArticleContent';
import { Footer } from './components/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessPage } from './components/SuccessPage';
import { initMetaPixel, trackPageView } from './utils/metaPixel';
// Wrapper component to handle the success page with location state
function SuccessPageWrapper() {
  const location = useLocation();
  const leadData = location.state?.leadData || {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: ''
  };
  const leadId = location.state?.leadId || undefined;
  return <SuccessPage leadData={leadData} leadId={leadId} />;
}
// Main content component
function MainContent() {
  return <main className="w-full max-w-3xl mx-auto px-4 md:px-6">
      <div className="mt-4 md:mt-8">
        <ArticleHeader />
        <ArticleContent />
      </div>
    </main>;
}
export function App() {
  useEffect(() => {
    initMetaPixel();
  }, []);

  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/success" element={<SuccessPageWrapper />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>;
}