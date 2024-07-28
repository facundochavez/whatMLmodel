import Head from 'next/head';
import Header from '@/layouts/Header/Header';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import CarouselSection from '@/layouts/CarouselSection/CarouselSection';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const favicon = document.querySelector('link[rel="icon"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (favicon && ogImage) {
      if (currentTheme === 'dark') {
        favicon.href = '/wMLm-favicon-dark.svg';
        ogImage.content = '/wMLm-favicon-dark.svg';
      } else {
        favicon.href = '/wMLm-favicon-light.svg';
        ogImage.content = '/wMLm-favicon-light.svg';
      }
    }
  }, [theme, systemTheme]);

  return (
    <div className={`w-full flex flex-col items-center ${inter.className}`}>
      <Head>
        <title>whatMLmodel</title>
        <meta
          name='description'
          content='App to find the machine learning model that best fits your data'
        />
        <link rel='icon' href='/wMLm-favicon-light.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:image' content='/wMLm-favicon-light.svg' />
        <meta property='og:title' content='whatMLmodel' />
        <meta
          property='og:description'
          content='App to find the machine learning model that best fits your data'
        />
        <meta name='google' content='notranslate' />
      </Head>
      <Header />
      <main className='w-full flex flex-col items-center px-[5%]'>
        <CarouselSection />
      </main>
      <footer></footer>
    </div>
  );
}
