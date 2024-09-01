import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import NavBar from "@/app/Components/NavBar"
import Footer from "../Components/Footer";
import AuthProvider from "../../context/providersAuthNext"

const poppins = Poppins({ subsets: ["latin"], weight: ["400","500", "700","900" ]
  , 
  style :['italic', 'normal'],
  variable : '--font-poppins',
});

export const metadata: Metadata = {
  title: "Luxe Living Estates",
  description: "Discover the best for you ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={poppins.className}>
      <NavBar/>
      <main className="font-normal">
         {children}
      </main>
       <Footer/>
      
        </body>
        </AuthProvider>
    </html>
  );
}
