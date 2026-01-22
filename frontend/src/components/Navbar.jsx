// Safely get React Router DOM hooks and components
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
const Link = routerDOM?.Link;
const useNavigateHook = routerDOM?.useNavigate;

const { useEffect, useState } = React;

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Always call the hook (React requirement), but handle if it's not available
  let navigate = null;
  try {
    if (useNavigateHook) {
      navigate = useNavigateHook();
    }
  } catch (e) {
    console.warn('useNavigate not available:', e);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    if (navigate) {
      navigate('/login');
    } else {
      window.location.href = '/login';
    }
  };

  if (!Link) {
    return React.createElement('nav', { className: 'navbar' },
      React.createElement('div', null, 'Router not loaded')
    );
  }

  return React.createElement('nav', { className: 'navbar' },
    React.createElement('div', { className: 'container navbar-content' },
      React.createElement(Link, { to: '/', className: 'navbar-brand' }, 'InfoBot'),
      React.createElement('div', { className: 'navbar-links' },
        React.createElement(Link, { to: '/' }, 'Home'),
        React.createElement(Link, { to: '/about' }, 'About'),
        React.createElement(Link, { to: '/how-to-use' }, 'How to Use'),
        React.createElement(Link, { to: '/api-doc' }, 'API Doc'),
        isAuthenticated ? React.createElement(React.Fragment, null,
          React.createElement(Link, { to: '/dashboard' }, 'Dashboard'),
          React.createElement('button', { className: 'navbar-button', onClick: handleLogout }, 'Logout')
        ) : React.createElement(React.Fragment, null,
          React.createElement(Link, { to: '/login', className: 'navbar-button' }, 'Login'),
          React.createElement(Link, { to: '/register', className: 'navbar-button' }, 'Register')
        )
      )
    )
  );
}


