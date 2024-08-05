import type { AppProps } from 'next/app';
import '../style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-4xl px-4 mx-auto flex flex-col items-center">
      <Component {...pageProps} />
    </div>
  );
}