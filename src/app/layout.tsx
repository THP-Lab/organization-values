import { AtypDisplay, AtypText } from "@/fonts/fonts";
import "../styles/global.scss";
import Providers from "@/contexts/providers";
import Script from "next/script";

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: "Organization Values",
  description:
    "Join this community project in an experiment to collectively align on the values at the core of any organization.",
  openGraph: {
    type: "website",
    title: "Organization Values",
    description:
      "Join this community project in an experiment to collectively align on the values at the core of any organization.",
    siteName: "Organization Values",
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
