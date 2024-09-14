import '@/styles/globals.css';
import ThemeProvider from '@/components/theme-provider';
import type { AppProps } from 'next/app';
import GlobalProvider from '@/context/global.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ThemeProvider>
  );
}
