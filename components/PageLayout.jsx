'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'
import Providers from '@/utils/providers'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import GetInTouch from './GetInTouch'

export default function PageLayout({ children }) {
  const pathname = usePathname()
  const { setTheme } = useTheme('light')
  const [popup, setPopup] = useState(false)
  useEffect(() => {
    setTheme('light')
  }, [])

  return (
    <>
      {pathname.startsWith('/studio') ? (
        children
      ) : (
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar setPopup={setPopup} />
          <main>{children}</main>
          {popup ? <GetInTouch setPopup={setPopup} /> : null}
          <Footer />
        </Providers>
      )}
    </>
  )
}
