import * as React from 'react'
import Head from 'next/head'
import '../style.css'
import { wrapper } from '../store/store'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../store/theme'
import createEmotionCache from '../store/createEmotionCache'

const languages = {
  en: require('/translations/en.json'),
  es: require('/translations/es.json'),
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  // see https://www.infoxicator.com/es/traduciendo-mi-blog-con-next-js
  const router = useRouter()
  const { locale, defaultLocale } = router
  const messages = languages[locale]
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </CacheProvider>
  )
}

export default wrapper.withRedux(MyApp)
