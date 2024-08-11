import Head from "next/head";
import Header from "@/layouts/Header/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`w-full flex flex-col items-center ${inter.className}`}>
      <Head>
        <title>whatMLmodel</title>
        <meta
          name='description'
          content='App to find the machine learning model that best fits your data'
        />
        <link rel='icon' href='/wMLm-favicon.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:image' content='/wMLm-favicon.svg' />
        <meta property='og:title' content='whatMLmodel' />
        <meta
          property='og:description'
          content='App to find the machine learning model that best fits your data'
        />
        <meta name='google' content='notranslate' />
      </Head>
      <Header />
      <main className='w-full flex flex-col items-center px-[5%]'>
        
      </main>
      <footer></footer>
    </div>
  );
}
