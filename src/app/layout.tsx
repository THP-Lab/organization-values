import { AtypDisplay, AtypText } from "@/fonts/fonts";
import "../styles/global.scss";
import Providers from "@/contexts/providers";
import Script from "next/script";

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: "Ethereum Values",
  description:
    "Join the community in an experiment to collectively align on the values at the core of Ethereum.",
  openGraph: {
    type: "website",
    title: "Ethereum Values",
    description:
      "Join the community in an experiment to collectively align on the values at the core of Ethereum.",
    siteName: "Ethereum Values",
    images: [
      {
        url: "/images/og-image.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${AtypDisplay.variable} ${AtypText.variable}`}>
      <head>
        <Script
          src="https://cmp.osano.com/AzZMxHTbQDOQD8c1J/6bd42b63-9020-409c-a672-b8cbca7dea09/osano.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
