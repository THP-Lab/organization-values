import { AtypDisplay, AtypText } from "@/fonts/fonts";
import "../styles/global.scss";
import Providers from "@/components/providers/Providers";

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
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
    index: false,
    follow: false,
    noimageindex: true,
    noarchive: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${AtypDisplay.variable} ${AtypText.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
