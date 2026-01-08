
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Extend the Window interface to include lucide and the pre-defined AIStudio type
// The compiler expects window.aistudio to be of type AIStudio to match existing global declarations in the environment.
declare global {
  interface Window {
    lucide: any;
    // Making this optional to match existing declarations in the environment
    aistudio?: AIStudio;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
