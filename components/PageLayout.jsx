'use client'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import Providers from '../utils/providers'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import GetInTouch from './GetInTouch'
import ThemeSwitcher from './ThemeSwitcher'
import 'react-hook-consent/dist/styles/style.css'
import { ConsentBanner, ConsentProvider } from 'react-hook-consent'

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
          {/* <ThemeSwitcher>
            
          </ThemeSwitcher> */}
          <ConsentProvider
            options={{
              services: [
                {
                  id: 'myid',
                  name: 'MyName',
                  scripts: [
                    { id: 'external-script', src: 'https://myscript.com/script.js' },
                    // { id: 'inline-code', code: `alert("I am a JavaScript code");` },
                  ],
                  cookies: [{ pattern: 'cookie-name' }, { pattern: /regex/ }],
                  localStorage: ['local-storage-key'],
                  sessionStorage: ['session-storage-key'],
                  mandatory: true,
                },
              ],
              // customHash: 'my-custom-hash', // optional, e.g. when changing the options based on language
              theme: 'light',
            }}>
            <Navbar setPopup={setPopup} />
            <main>{children}</main>
            {popup ? <GetInTouch setPopup={setPopup} /> : null}
            <Footer />
            <ConsentBanner
              settings={{ hidden: true, label: 'More', modal: { title: 'Modal title' } }}
              decline={{ hidden: false, label: 'Not Accept' }}
              approve={{ label: 'Accept' }}>
              <>
                Can we use cookies and external services according to our <a href="/privacy">privacy policy</a> to
                improve the browsing experience?
              </>
            </ConsentBanner>
          </ConsentProvider>
        </Providers>
      )}
    </>
  )
}
