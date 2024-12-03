import { useState, useEffect, useCallback } from 'react'

interface Section {
  id: string
  ref: HTMLElement | null
}

export function useScrollSpy(sections: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const getSectionRefs = useCallback(() => {
    return sections.map(id => ({
      id,
      ref: document.getElementById(id)
    }))
  }, [sections])

  useEffect(() => {
    const handleScroll = () => {
      const sectionRefs = getSectionRefs()
      const scrollPosition = window.scrollY + offset

      // Find the current section
      const current = sectionRefs.find(({ ref }) => {
        if (!ref) return false
        const { offsetTop, offsetHeight } = ref
        return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [getSectionRefs, offset])

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const sectionTop = section.offsetTop
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }, [])

  const isActive = useCallback((sectionId: string) => {
    return activeSection === sectionId
  }, [activeSection])

  return {
    activeSection,
    scrollToSection,
    isActive
  }
}