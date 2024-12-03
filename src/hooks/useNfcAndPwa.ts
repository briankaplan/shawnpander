import { useEffect, useState, useCallback } from 'react'

interface UseNfcAndPwaProps {
  onNfcRead?: (data: any) => void
  onPushSubscriptionChange?: (subscription: PushSubscription | null) => void
}

// Convert base64 string to Uint8Array for applicationServerKey
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

export function useNfcAndPwa({ onNfcRead, onPushSubscriptionChange }: UseNfcAndPwaProps = {}) {
  const [nfcSupported, setNfcSupported] = useState(false)
  const [nfcReader, setNfcReader] = useState<any>(null)
  const [pushSupported, setPushSupported] = useState(false)
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null)

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(async (registration) => {
          console.log('Service Worker registered:', registration)

          // Check push notification support
          const subscription = await registration.pushManager.getSubscription()
          setPushSupported(true)
          setPushSubscription(subscription)

          if (onPushSubscriptionChange) {
            onPushSubscriptionChange(subscription)
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [onPushSubscriptionChange])

  // Initialize NFC
  useEffect(() => {
    const checkNfcSupport = async () => {
      if ('NDEFReader' in window) {
        setNfcSupported(true)
        try {
          const reader = new (window as any).NDEFReader()
          setNfcReader(reader)
        } catch (error) {
          console.error('Error initializing NFC reader:', error)
        }
      }
    }

    checkNfcSupport()
  }, [])

  // Handle NFC reading
  useEffect(() => {
    if (nfcReader && onNfcRead) {
      const handleReading = ({ message }: any) => {
        const decoder = new TextDecoder()
        for (const record of message.records) {
          if (record.recordType === "text") {
            const text = decoder.decode(record.data)
            try {
              const data = JSON.parse(text)
              onNfcRead(data)
            } catch (e) {
              console.error('Error parsing NFC data:', e)
            }
          }
        }
      }

      const startScanning = async () => {
        try {
          await nfcReader.scan()
          nfcReader.addEventListener("reading", handleReading)
        } catch (error) {
          console.error('Error starting NFC scan:', error)
        }
      }

      startScanning()

      return () => {
        nfcReader.removeEventListener("reading", handleReading)
      }
    }
  }, [nfcReader, onNfcRead])

  // Subscribe to push notifications
  const subscribeToPush = useCallback(async () => {
    if (!pushSupported || !VAPID_PUBLIC_KEY) {
      console.error('Push notifications not supported or VAPID key missing');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      setPushSubscription(subscription);
      if (onPushSubscriptionChange) {
        onPushSubscriptionChange(subscription);
      }

      return subscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  }, [pushSupported, onPushSubscriptionChange]);

  // Unsubscribe from push notifications
  const unsubscribeFromPush = useCallback(async () => {
    if (pushSubscription) {
      try {
        await pushSubscription.unsubscribe()
        setPushSubscription(null)
        if (onPushSubscriptionChange) {
          onPushSubscriptionChange(null)
        }
      } catch (error) {
        console.error('Error unsubscribing from push notifications:', error)
      }
    }
  }, [pushSubscription, onPushSubscriptionChange])

  // Start NFC scanning
  const startNfcScan = useCallback(async () => {
    if (nfcReader) {
      try {
        await nfcReader.scan()
        return true
      } catch (error) {
        console.error('Error starting NFC scan:', error)
        return false
      }
    }
    return false
  }, [nfcReader])

  // Stop NFC scanning
  const stopNfcScan = useCallback(() => {
    if (nfcReader) {
      try {
        nfcReader.stop()
        return true
      } catch (error) {
        console.error('Error stopping NFC scan:', error)
        return false
      }
    }
    return false
  }, [nfcReader])

  return {
    nfcSupported,
    pushSupported,
    pushSubscription,
    subscribeToPush,
    unsubscribeFromPush,
    startNfcScan,
    stopNfcScan
  }
}