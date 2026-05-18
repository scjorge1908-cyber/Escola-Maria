import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handling to suppress noisy extension errors and logs
window.addEventListener('error', (event) => {
  const errorMessage = event.message || "";
  const fileName = event.filename || "";

  // Ignorar erros conhecidos de extensões ou scripts externos (ex: 'query' of undefined)
  const isExtensionError = 
    fileName.includes('extension') || 
    fileName.includes('content.js') ||
    errorMessage.includes("reading 'query'") ||
    errorMessage.includes("Cannot read properties of undefined") ||
    errorMessage.includes("Script error");

  if (isExtensionError) {
    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.stack || event.reason?.message || "";
  if (reason.includes('extension') || reason.includes('content.js')) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
