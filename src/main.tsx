import {StrictMode} from 'react';
import {hydrateRoot, createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// If root has SSG pre-rendered content, hydrate instead of replacing it.
// This preserves SEO content for crawlers and avoids content flash.
if (rootElement.childElementCount > 0) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
