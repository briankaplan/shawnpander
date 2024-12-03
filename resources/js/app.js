if ('serviceWorker' in navigator) {
  // Only register service worker on admin pages
  if (window.location.pathname.startsWith('/admin')) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('Admin PWA Service Worker registered');
      })
      .catch(err => {
        console.error('Admin PWA Service Worker registration failed:', err);
      });
  }
} 