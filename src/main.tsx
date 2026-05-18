import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handling to suppress noisy extension errors and logs
window.addEventListener('error', (event) => {
  // Ignorar erros de extensões ou scripts externos conhecidos por dar problema
  const errorMessage = event.message || "";
  const fileName = event.filename || "";

  const isExtensionError = 
    fileName.includes('extension') || 
    fileName.includes('content.js') ||
    errorMessage.includes("reading 'query'") ||
    errorMessage.includes("Cannot read properties of undefined");

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
