'use client'

import ConsentBanner from '@/components/ConsentBanner'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie-consent'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null)

  useEffect(() => {
    const cookieConsent = Cookies.get('cookie-consent')
    setConsentGiven(
      cookieConsent === 'true' ? true : cookieConsent === 'false' ? false : null
    )
  }, [])

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'true', { expires: 365 })
    setConsentGiven(true)
    window.location.reload()
  }

  const handleDecline = () => {
    Cookies.set('cookie-consent', 'false', { expires: 365 })
    setConsentGiven(false)
  }

  const GTAG = 'G-369L3Y1NX5'

  return (
    <>
      {consentGiven && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
          />
          <Script
            strategy="afterInteractive"
            src="/scripts/google-analytics.js"
            // id="google-analytics"
            // strategy="afterInteractive"
            // dangerouslySetInnerHTML={{
            //   __html: `
            //     window.dataLayer = window.dataLayer || [];
            //     function gtag(){dataLayer.push(arguments);}
            //     gtag('js', new Date());
            //     gtag('config', '${GTAG}', {
            //       anonymize_ip: true,
            //       cookie_flags: 'SameSite=None;Secure',
            //       cookie_expires: 7776000
            //     });
            //   `,
            // }}
          />
        </>
      )}
      {children}

      {consentGiven === null && (
        <ConsentBanner onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </>
  )
}
