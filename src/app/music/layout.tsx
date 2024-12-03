import { MusicLayoutContent } from '@/components/sections/MusicLayout'

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MusicLayoutContent>{children}</MusicLayoutContent>
}