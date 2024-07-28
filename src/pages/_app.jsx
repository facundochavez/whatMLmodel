import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import CarouselProvider from '@/context/carousel.context';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <CarouselProvider>
        <Component {...pageProps} />
      </CarouselProvider>
    </ThemeProvider>
  );
}
