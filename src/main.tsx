import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handling to suppress noisy extension errors and logs
window.addEventListener('error', (event) => {
  // Ignorar erros de extensões do Chrome ou outros scripts externos que não do app
  const isExtensionError = 
    event.filename?.includes('extension') || 
    event.filename?.includes('content.js') ||
    event.message?.includes("reading 'query'");

  if (isExtensionError) {
    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }
}, true);

// Suppress unhandled promise rejections from extensions too
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.stack || event.reason?.message || "";
  if (reason.includes('extension') || reason.includes('content.js')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
