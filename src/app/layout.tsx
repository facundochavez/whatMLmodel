import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import GlobalProvider from "@/context/global.context";
import AnalysesProvider from "@/context/analyses.context";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import ClientWrapper from "@/components/ClientWrapper/ClientWrapper"; // ✅ Importamos el nuevo componente

export const metadata = {
  title: "whatMLmodel",
  description:
    "App to find the machine learning model that best fits your data through AI",
  icons: {
    icon: "/wMLm-favicon.svg",
  },
  openGraph: {
    images: ["/wMLm-favicon.svg"],
    title: "whatMLmodel",
    description:
      "App to find the machine learning model that best fits your data through AI",
  },
  robots: {
    google: "notranslate",
  },
  metadataBase: new URL("https://whatmlmodel.vercel.app"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative" lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalProvider>
            <AnalysesProvider>
              {/* ✅ Insertamos el ClientWrapper aquí */}
              <ClientWrapper />
              <div className="fixed top-0 inset-0 -z-10 h-screen w-screen bg-[linear-gradient(to_right,hsl(var(--background-lines))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--background-lines))_1px,transparent_1px)] bg-[size:6rem_4rem]" />
              <Header />
              <main className="w-screen min-h-[calc(100vh-50px)] flex flex-col items-center gap-12 sm:gap-16 px-[5%] pt-[85px] sm:pt-[95px] pb-10">
                {children}
              </main>
              <Footer />
            </AnalysesProvider>
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
