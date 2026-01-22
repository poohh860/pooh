// Wait for all components to be loaded
function initApp() {
  // Check if React and ReactDOM are available
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.error('React or ReactDOM not loaded');
    document.getElementById('root').innerHTML = '<div style="padding: 20px; color: red;"><h2>Error: React libraries not loaded</h2><p>Please check your internet connection and refresh the page.</p></div>';
    return;
  }

  // Check if React Router and React Router DOM are loaded
  const reactRouter = (typeof window !== 'undefined' && window.ReactRouter) || null;
  const routerDOM = (typeof window !== 'undefined' && window.ReactRouterDOM) || (typeof ReactRouterDOM !== 'undefined' ? ReactRouterDOM : null);
  
  if (!reactRouter) {
    console.error('ReactRouter not loaded');
    document.getElementById('root').innerHTML = '<div style="padding: 20px; color: red;"><h2>Error: React Router not loaded</h2><p>Please check your internet connection and refresh the page.</p><p>Check browser console for details.</p></div>';
    return;
  }
  
  if (!routerDOM) {
    console.error('ReactRouterDOM not loaded');
    console.log('window.ReactRouter:', typeof window !== 'undefined' ? typeof window.ReactRouter : 'N/A');
    console.log('window.ReactRouterDOM:', typeof window !== 'undefined' ? typeof window.ReactRouterDOM : 'N/A');
    document.getElementById('root').innerHTML = '<div style="padding: 20px; color: red;"><h2>Error: React Router DOM not loaded</h2><p>Please wait a moment and refresh the page.</p><p>Check browser console for details.</p></div>';
    return;
  }

  // Check if required components are loaded
  if (typeof App === 'undefined' || typeof Layout === 'undefined' || typeof Home === 'undefined') {
    console.log('Waiting for components to load...', {
      App: typeof App,
      Layout: typeof Layout,
      Home: typeof Home,
      ReactRouterDOM: typeof ReactRouterDOM
    });
    setTimeout(initApp, 100);
    return;
  }

  try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(App)
      )
    );
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
    document.getElementById('root').innerHTML = '<div style="padding: 20px; color: red;"><h2>Error initializing application</h2><p>' + error.message + '</p><p>Check browser console for details.</p></div>';
  }
}

// Initialize app once DOM is ready and React Router DOM is loaded
function waitAndInit() {
  const reactRouter = (typeof window !== 'undefined' && window.ReactRouter) || null;
  const routerDOM = (typeof window !== 'undefined' && window.ReactRouterDOM) || null;
  
  if (!reactRouter || !routerDOM) {
    console.log('Waiting for React Router libraries...', {
      ReactRouter: !!reactRouter,
      ReactRouterDOM: !!routerDOM
    });
    setTimeout(waitAndInit, 200);
    return;
  }
  
  // Additional check: verify createBrowserHistory exists
  if (reactRouter.createBrowserHistory) {
    console.log('createBrowserHistory is available');
  } else {
    console.warn('createBrowserHistory not found in ReactRouter', Object.keys(reactRouter));
  }
  
  initApp();
}

// Listen for the custom event when React Router is ready
window.addEventListener('react-router-ready', function() {
  console.log('React Router ready event received');
  setTimeout(waitAndInit, 100);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Start checking after DOM is ready
    setTimeout(waitAndInit, 300);
  });
} else {
  // Start checking immediately
  setTimeout(waitAndInit, 300);
}

