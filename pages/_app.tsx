import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'
import { wrapper } from '../store/store'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../store/theme'

const languages = {
  en: require('/translations/en.json'),
  es: require('/translations/es.json'),
}

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  // see https://www.infoxicator.com/es/traduciendo-mi-blog-con-next-js
  const router = useRouter()
  const { locale, defaultLocale } = router
  const messages = languages[locale]

  return (
    <>
      <Head>
        <title>ARASAAC boards</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
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
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
