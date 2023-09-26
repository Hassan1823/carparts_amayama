import "./globals.css";
import { Outfit } from "next/font/google";

// local imports
import HeadBar from "@/components/HeadBar";
import Footer from "@/components/Footer";
import RecoilWrapper from "@/components/RecoilWrapper";
import Provider from "@/components/Provider";

// other imports
import { Toaster } from "react-hot-toast";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Amayama",
  description: "Parts For Every Category",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <RecoilWrapper>
            <Toaster />
            <HeadBar />
            {children}
            <Footer />
          </RecoilWrapper>
        </Provider>
      </body>
    </html>
  );
}
