import { AtypDisplay, AtypText } from "@/fonts/fonts";
import "../styles/global.scss";
import Providers from "@/contexts/providers";
import Script from "next/script";

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: "Community Values Platform | Collective Intelligence for Organizations",
  description:
    "A participatory platform where communities define, discuss, and align on their core values through transparent voting and meaningful dialogue.",
  openGraph: {
    type: "website",
    title: "Community Values Platform | Define What Matters Together",
    description:
      "Join our experiment in collective intelligence where communities discover and align on the principles that guide their future through transparent participation and meaningful dialogue.",
    siteName: "Organization Values",
    images: [
      {
        url: "/images/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Define Your Community's Values Together",
    description: "A platform for collaborative value discovery and alignment"
  },
  keywords: [
    "organizational values", 
    "community values", 
    "collective intelligence", 
    "value alignment", 
    "participatory governance", 
    "community building"
  ],
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
