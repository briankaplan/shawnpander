import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const SALT_LENGTH = 16
const TAG_LENGTH = 16

export async function encrypt(text: string): Promise<string> {
  const iv = randomBytes(IV_LENGTH)
  const salt = randomBytes(SALT_LENGTH)
  const key = Buffer.from(process.env.TOKEN_SECRET!, 'base64')

  const cipher = createCipheriv(ALGORITHM, key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const tag = cipher.getAuthTag()

  const result = Buffer.concat([salt, iv, tag, Buffer.from(encrypted, 'hex')])
  return result.toString('base64')
}

export async function decrypt(encryptedText: string): Promise<string> {
  const buffer = Buffer.from(encryptedText, 'base64')
  
  const salt = buffer.subarray(0, SALT_LENGTH)
  const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
  const tag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH)
  const content = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH)
  
  const key = Buffer.from(process.env.TOKEN_SECRET!, 'base64')
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  
  decipher.setAuthTag(tag)
  
  let decrypted = decipher.update(content)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  
  return decrypted.toString('utf8')
} 