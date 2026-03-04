import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
        strategy="afterInteractive"
      />
    </>
  )
}

/**
 * Google Site Verification Meta Tag
 */
export function GoogleSiteVerification({ verification }: { verification?: string }) {
  if (!verification) return null

  return (
    <meta name="google-site-verification" content={verification} />
  )
}

/**
 * Track page views and events
 */
export const gtag = {
  pageview: (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('pageview', {
        page_path: url,
      })
    }
  },
  event: (action: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, params)
    }
  },
}
