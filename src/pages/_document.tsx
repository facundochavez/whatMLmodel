import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='relative'>
        <div className='fixed top-0 inset-0 -z-10 h-screen w-screen bg-[linear-gradient(to_right,hsl(var(--background-lines))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--background-lines))_1px,transparent_1px)] bg-[size:6rem_4rem]' />
{/*         <div className='fixed h-full w-full -z-10 bg-[radial-gradient(hsl(var(--background-points))_1px,transparent_1.5px)] [background-size:25px_25px] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_100%,#000_70%,transparent_100%)]'></div>
 */}        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
