import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-4xl px-4 mx-auto flex flex-col items-center">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}