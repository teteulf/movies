import { Inter } from "next/font/google";
import Header from "./header";
import { ThemeProvider } from "./hooks/useContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MovieApi",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${inter.className} overflow-x-hidden bg-black m-0`}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
