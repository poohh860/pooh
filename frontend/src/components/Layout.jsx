// Safely get Outlet from React Router DOM
const getRouterDOM = function() {
  if (typeof window !== 'undefined' && window.ReactRouterDOM) {
    return window.ReactRouterDOM;
  }
  if (typeof ReactRouterDOM !== 'undefined') {
    return ReactRouterDOM;
  }
  return null;
};
const Outlet = getRouterDOM()?.Outlet;

function Layout() {
  return React.createElement('div', { className: 'layout' },
    React.createElement(Navbar),
    React.createElement('main', { className: 'main-content' },
      React.createElement(Outlet)
    ),
    React.createElement('footer', { className: 'footer' },
      React.createElement('div', { className: 'container' },
        React.createElement('p', null, '\u00A9 2026 InfoBot. All rights reserved.')
      )
    )
  );
}

