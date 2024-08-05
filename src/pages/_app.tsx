import type { AppProps } from 'next/app';
import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='w-3/4'>
      <Component {...pageProps} />
    </div>
  );
}