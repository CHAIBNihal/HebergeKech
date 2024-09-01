import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../../../globals.css"
import AuthProvider from "../../../../context/providersAuthNext"


const poppins = Poppins({ subsets: ["latin"], weight: ["400","500", "700","900" ]
  , 
  style :['italic', 'normal'],
  variable : '--font-poppins',
});

export const metadata: Metadata = {
  title: "Luxury Living Estates Admin",
  description: "This is Dashboard Admin Pages ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider >
      <body>
        <div>{children}</div> 

      </body>
   </AuthProvider>
   </html>
  )
       
      
    
 
}
