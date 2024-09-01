import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.jpg";
import { FaInstagram, FaFacebookF, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center h-auto bg-primary m-3 p-5 rounded-xl ">
      <div className="flex flex-col items-center md:items-start m-5">
        <Image src={Logo} alt="Logo" height={50} width={55}/>
       
      </div>
      <div className="mt-5 md:mt-0">
        <h2 className="text-center md:text-left"> <strong>LUXE LIVING ESTATES</strong> | LUXELIVINGESTATES@gmail.com</h2>
      </div>
      <div className="flex flex-col items-center mt-5 md:mt-0 mr-0 md:mr-12">
        <h1 className="font-semibold underline">Send Us</h1>
        <div className="flex justify-between mt-4">
          <a href="https://www.instagram.com" aria-label="Instagram">
            <FaInstagram className="text-2xl mx-2" />
          </a>
          <a href="https://www.facebook.com" aria-label="Facebook">
            <FaFacebookF className="text-2xl mx-2" />
          </a>
          <a href="mailto:estatesluxeliving@gmail.com" aria-label="Email">
            <FaEnvelope className="text-2xl mx-2" />
          </a>
          <a href="https://wa.me/+212644929034" aria-label="WhatsApp">
            <FaWhatsapp className="text-2xl mx-2" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
