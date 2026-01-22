// Simple router
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
    this.init();
  }
  
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }
  
  addRoute(path, handler) {
    this.routes[path] = handler;
  }
  
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];
    this.currentRoute = path;
    
    const handler = this.routes[path] || this.routes['/'];
    if (handler) {
      handler();
    }
  }
  
  navigate(path) {
    window.location.hash = path;
  }
}

const router = new Router();

