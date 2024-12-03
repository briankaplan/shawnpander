'use client'

import { cn } from '@/lib/utils'

export const Announcement = () => {
  return (
    <section
      className={cn(
        "relative py-12 overflow-hidden",
        "opacity-0 animate-fade-in",
        "animate-delay-300"
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,88,12,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.3),transparent_70%)]" />
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-bold text-orange-400",
              "opacity-0 translate-y-4 animate-fade-in",
              "animate-delay-400"
            )}
          >
            Album Release Show - December 22nd
          </h2>
          <p 
            className={cn(
              "text-xl text-orange-200/80 leading-relaxed",
              "opacity-0 translate-y-4 animate-fade-in",
              "animate-delay-500"
            )}
          >
            Join us for an unforgettable evening celebrating the release of "Forever & For Now". 
            Experience the first live performance of the new album, including the debut single 
            "Let's Just Groove".
          </p>
          <div
            className={cn(
              "flex flex-wrap justify-center gap-4 pt-4",
              "opacity-0 translate-y-4 animate-fade-in",
              "animate-delay-600"
            )}
          >
            <a
              href="#shows"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full 
                transition-colors duration-300 font-medium shadow-lg shadow-orange-500/20"
            >
              Get Tickets
            </a>
            <a
              href="#vinyl"
              className="px-8 py-3 bg-black/30 hover:bg-black/50 text-orange-200 rounded-full 
                transition-colors duration-300 border border-orange-500/30 backdrop-blur-sm"
            >
              Listen Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}