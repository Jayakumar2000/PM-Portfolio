import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

// Fix for TypeError: Cannot set property fetch of #<Window> which has only a getter
// This happens when a library (like formdata-polyfill) tries to patch window.fetch
// in an environment where it's defined as a getter without a setter.
(function() {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (descriptor && descriptor.get && !descriptor.set && descriptor.configurable) {
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: true,
        get: descriptor.get,
        set: function(_v) {
          console.warn('Attempted to overwrite window.fetch, ignoring to prevent crash.');
        }
      });
    }
  } catch (e) {
    console.error('Failed to apply fetch polyfill fix:', e);
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
