// Safely get React Router DOM components
// Try multiple ways to access ReactRouterDOM
const getRouterDOM = function() {
  if (typeof window !== 'undefined' && window.ReactRouterDOM) {
    return window.ReactRouterDOM;
  }
  if (typeof ReactRouterDOM !== 'undefined') {
    return ReactRouterDOM;
  }
  return null;
};

const routerDOM = getRouterDOM();
const BrowserRouter = routerDOM?.BrowserRouter;
const Routes = routerDOM?.Routes;
const Route = routerDOM?.Route;
const Navigate = routerDOM?.Navigate;

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return React.createElement(Navigate, { to: "/login" });
  }
  return children;
}

function App() {
  if (!BrowserRouter || !Routes || !Route) {
    return React.createElement('div', null, 'Error: React Router not loaded properly');
  }
  
  return React.createElement(BrowserRouter, null,
    React.createElement(Routes, null,
      React.createElement(Route, { path: "/", element: React.createElement(Layout) },
        React.createElement(Route, { index: true, element: React.createElement(Home) }),
        React.createElement(Route, { path: "about", element: React.createElement(About) }),
        React.createElement(Route, { path: "how-to-use", element: React.createElement(HowToUse) }),
        React.createElement(Route, { path: "api-doc", element: React.createElement(ApiDoc) }),
        React.createElement(Route, { path: "login", element: React.createElement(Login) }),
        React.createElement(Route, { path: "register", element: React.createElement(Register) }),
        React.createElement(Route, {
          path: "dashboard",
          element: React.createElement(PrivateRoute, null, React.createElement(Dashboard))
        })
      )
    )
  );
}

