'use client'

import { Shows } from '@/components/Shows'

export function ShowsSection() {
  return (
    <section id="shows" className="relative py-12">
      <div className="container mx-auto px-4">
        <Shows />
      </div>
    </section>
  )
}