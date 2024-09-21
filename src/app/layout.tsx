import '@/styles/globals.css';
import ThemeProvider from '@/components/theme-provider';
import GlobalProvider from '@/context/global.context';
import Header from '@/app/components/Header';

export const metadata = {
  title: 'whatMLmodel',
  description:
    'App to find the machine learning model that best fits your data through AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='relative'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <GlobalProvider>
            <div className='fixed top-0 inset-0 -z-10 h-screen w-screen bg-[linear-gradient(to_right,hsl(var(--background-lines))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--background-lines))_1px,transparent_1px)] bg-[size:6rem_4rem]' />
            <Header />
            <main className='w-full flex flex-col items-center px-[5%] pb-20 pt-[90px]'>
              {children}
            </main>
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
