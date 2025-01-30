import localFont from "next/font/local";

const AtypDisplay = localFont({
  src: [
    {
      path: "./AtypDisplay-Regular-subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AtypDisplay-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./AtypDisplay-Bold-subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./AtypDisplay-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./AtypDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./AtypDisplay-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./AtypDisplay-Medium-subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./AtypDisplay-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./AtypDisplay-Semibold-subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./AtypDisplay-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./AtypDisplay-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./AtypDisplay-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-atyp-display",
  fallback: ["Arial", "sans-serif"],
});

const AtypText = localFont({
  src: [
    {
      path: "./AtypText-Regular-subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./AtypText-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./AtypText-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./AtypText-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./AtypText-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./AtypText-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./AtypText-Medium-subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./AtypText-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./AtypText-Semibold-subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./AtypText-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./AtypText-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./AtypText-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-atyp-text",
  fallback: ["Arial", "serif"],
});

export { AtypDisplay, AtypText };
