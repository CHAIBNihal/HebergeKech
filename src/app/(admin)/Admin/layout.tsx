import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../../globals.css";
import Header from "@/app/Components/admin/NavAdmin/Header";
import SideBar from "../../Components/admin/SideBar/SideBar";
import style from "../../Components/admin/dash.module.css"
import "./admin.css"
import Footer from "@/app/Components/admin/Footer/Footer";
import AuthProvider from "@/context/providersAuthNext";

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
      <AuthProvider>
      <body className={poppins.className}  >
        
        <div className={style.container}> 
          <div className={style.menu}>
          <SideBar/>
          </div>
          <div className={style.content}>
           <Header />
          {children} 
           <Footer/>
         
          </div>
      </div>
    </body>
    </AuthProvider>
    </html>
  )
       
      
    
 
}
