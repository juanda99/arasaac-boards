import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from '../components/Page'
import { addCount } from '../store/count/action'
import { wrapper } from '../store/store'
import { serverRenderClock, startClock } from '../store/tick/action'

const IndexPage = (props)  => {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

    useEffect(() => {
    const timer = props.startClock()

    return () => {
      clearInterval(timer)
    }
  }, [props])

  return (
    <div>
      <h1>Index page</h1>
      <p>Current locale: {locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(locales)}</p>

      <Link href="/gsp">
        <a>To getStaticProps page</a>
      </Link>
      <br />

      <Link href="/gsp/first">
        <a>To dynamic getStaticProps page</a>
      </Link>
      <br />

      <Link href="/gssp">
        <a>To getServerSideProps page</a>
      </Link>
      <br />
      <Page title="Index Page" linkTo="/other" />
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(serverRenderClock(true))
  store.dispatch(addCount())
})

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(IndexPage)
