import Header from "@/app/_components/Header";

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
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
