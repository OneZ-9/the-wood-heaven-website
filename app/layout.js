import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/navigation";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

export const metadata = {
  // title: "The Wood Heaven",
  title: {
    template: "%s | The Wood Heaven",
    default: "Welcome | The Wood Heaven",
  },
  description:
    "Conceptual luxurious cabin hotel located in Ella, Sri Lanka. Surrounded by beautiful mountains and dark waterfalls",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
