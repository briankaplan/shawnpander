const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY!
const IV_LENGTH = 16

export function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH))
}

export async function encrypt(text: string): Promise<string> {
  if (typeof window === 'undefined') return text

  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const iv = generateIV()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(CRYPTO_KEY),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    )

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )

    const encryptedArray = new Uint8Array(encrypted)
    const result = new Uint8Array(iv.length + encryptedArray.length)
    result.set(iv)
    result.set(encryptedArray, iv.length)

    return btoa(String.fromCharCode(...result))
  } catch (error) {
    console.error('Encryption failed:', error)
    return text
  }
}

export async function decrypt(encoded: string): Promise<string> {
  if (typeof window === 'undefined') return encoded

  try {
    const decoder = new TextDecoder()
    const data = Uint8Array.from(atob(encoded), c => c.charCodeAt(0))
    const iv = data.slice(0, IV_LENGTH)
    const encrypted = data.slice(IV_LENGTH)

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(CRYPTO_KEY),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    )

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    )

    return decoder.decode(decrypted)
  } catch (error) {
    console.error('Decryption failed:', error)
    return encoded
  }
} 