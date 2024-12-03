const CACHE_NAME = 'band-tips-v1'
const urlsToCache = [
  '/',
  '/tips',
  '/tips/success',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
]

// Add path restriction
const ADMIN_PATH_REGEX = /^\/admin/;

// Only cache admin-related assets
const ADMIN_CACHE_ASSETS = [
  '/admin',
  '/admin/dashboard',
  // Add other admin routes you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New notification',
      icon: '/icons/icon-192x192.png', // Make sure this path is correct
      badge: '/icons/icon-96x96.png',   // Make sure this path is correct
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      },
      actions: [
        {
          action: 'explore',
          title: 'View',
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'New Message', options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'explore') {
    // Handle the action click
    clients.openWindow('/');
  }
});

// Handle NFC reading
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'nfc') {
    // Handle NFC data
    const nfcData = event.data.payload
    event.waitUntil(
      self.registration.showNotification('NFC Payment Detected', {
        body: 'Tap to complete payment',
        icon: '/icons/icon-192x192.png',
        data: { url: `/tips?amount=${nfcData.amount}` }
      })
    )
  }
})

// Background sync for offline payments
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-payment') {
    event.waitUntil(
      // Get pending payments from IndexedDB and process them
      self.registration.showNotification('Payment Sync', {
        body: 'Processing offline payment',
        icon: '/icons/icon-192x192.png'
      })
    )
  }
})