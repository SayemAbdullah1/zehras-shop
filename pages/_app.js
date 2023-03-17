import '@/styles/globals.css'
import { StoreProvider } from '@/utilities/store'

export default function App({ Component, pageProps }) {
  return (<StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>)
}
