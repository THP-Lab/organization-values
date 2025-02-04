import { AtypDisplay, AtypText } from "@/fonts/fonts";
import "../styles/global.scss";
import Providers from "@/components/providers/Providers";

export const metadata = {
  title: "Ethereum Values",
  description: "Propose and vote on Ethereum values",
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
