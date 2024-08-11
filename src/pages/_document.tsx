import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--background-lines))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--background-lines))_1px,transparent_1px)] bg-[size:6rem_4rem]' />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
