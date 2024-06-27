'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'
import Providers from '@/utils/providers'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function PageLayout({ children }) {
  const pathname = usePathname()
  const { setTheme } = useTheme('light')

  useEffect(() => {
    setTheme('light')
  }, [])

  return (
    <>
      {pathname.startsWith('/studio') ? (
        children
      ) : (
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      )}
    </>
  )
}
